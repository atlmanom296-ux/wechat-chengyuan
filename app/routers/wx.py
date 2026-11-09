"""WeChat mini-program auth endpoints."""

from __future__ import annotations

import hashlib
import json
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import ROLE_WX_USER, create_access_token, get_current_wx_user
from app.config import get_settings
from app.database import get_db
from app.models import WxUser
from app.schemas import WxLoginRequest, WxMeResponse, WxTokenResponse

router = APIRouter(prefix="/api/wx", tags=["wx"])

WX_CODE2SESSION = "https://api.weixin.qq.com/sns/jscode2session"
PLACEHOLDER_APPIDS = {"", "wxXXXXXXXXXXXXXXXX", "touristappid"}
PLACEHOLDER_SECRETS = {"", "replace-with-wechat-app-secret"}


def _use_mock(settings) -> bool:
    if settings.wx_mock_openid:
        return True
    appid = (settings.wx_appid or "").strip()
    secret = (settings.wx_secret or "").strip()
    return appid in PLACEHOLDER_APPIDS or secret in PLACEHOLDER_SECRETS


def _mock_openid(code: str) -> str:
    digest = hashlib.sha256(code.encode("utf-8")).hexdigest()[:16]
    return f"mock_openid_{digest}"


def _code2session(appid: str, secret: str, code: str) -> dict[str, Any]:
    query = urllib.parse.urlencode(
        {
            "appid": appid,
            "secret": secret,
            "js_code": code,
            "grant_type": "authorization_code",
        }
    )
    url = f"{WX_CODE2SESSION}?{query}"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.URLError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"WeChat code2session unreachable: {exc}",
        ) from exc
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Invalid response from WeChat",
        ) from exc
    return data


@router.post("/login", response_model=WxTokenResponse)
def wx_login(body: WxLoginRequest, db: Session = Depends(get_db)) -> WxTokenResponse:
    """Exchange wx.login code for a mini-program JWT (openid identity)."""
    settings = get_settings()
    if _use_mock(settings):
        openid = _mock_openid(body.code)
    else:
        data = _code2session(settings.wx_appid, settings.wx_secret, body.code)
        errcode = data.get("errcode")
        if errcode:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"WeChat login failed: {data.get('errmsg', errcode)}",
            )
        openid = data.get("openid")
        if not openid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="WeChat login failed: missing openid",
            )

    user = db.get(WxUser, openid)
    phone = body.phone.strip() if body.phone else None
    if user is None:
        user = WxUser(openid=openid, phone=phone)
        db.add(user)
    elif phone is not None:
        user.phone = phone
    db.commit()
    db.refresh(user)

    token = create_access_token(
        f"openid:{openid}",
        role=ROLE_WX_USER,
        extra={"openid": openid, "phone": user.phone},
    )
    return WxTokenResponse(access_token=token, openid=openid, phone=user.phone)


@router.get("/me", response_model=WxMeResponse)
def wx_me(
    identity: dict = Depends(get_current_wx_user),
    db: Session = Depends(get_db),
) -> WxMeResponse:
    openid = identity["openid"]
    user = db.get(WxUser, openid)
    phone = user.phone if user else identity.get("phone")
    return WxMeResponse(openid=openid, phone=phone)
