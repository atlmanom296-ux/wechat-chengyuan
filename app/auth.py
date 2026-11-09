"""JWT Bearer auth for admin CMS and WeChat mini-program users."""

from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.config import get_settings

security = HTTPBearer(auto_error=False)

ROLE_ADMIN = "admin"
ROLE_WX_USER = "wx_user"


def create_access_token(subject: str, *, role: str = ROLE_ADMIN, extra: dict[str, Any] | None = None) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    payload: dict[str, Any] = {"sub": subject, "role": role, "exp": expire}
    if extra:
        payload.update(extra)
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def verify_admin_credentials(username: str, password: str) -> bool:
    settings = get_settings()
    return username == settings.admin_username and password == settings.admin_password


def _decode_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


def get_current_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> str:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    settings = get_settings()
    payload = _decode_token(credentials.credentials)
    role = payload.get("role", ROLE_ADMIN)
    username: str | None = payload.get("sub")
    if role == ROLE_WX_USER or not username or username != settings.admin_username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return username


def get_current_wx_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> dict[str, str | None]:
    """Return {openid, phone} from a mini-program JWT."""
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = _decode_token(credentials.credentials)
    if payload.get("role") != ROLE_WX_USER:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not a mini-program token")
    openid = payload.get("openid") or _openid_from_sub(payload.get("sub"))
    if not openid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    phone = payload.get("phone")
    return {"openid": openid, "phone": phone}


def _openid_from_sub(sub: str | None) -> str | None:
    if not sub:
        return None
    if sub.startswith("openid:"):
        return sub[len("openid:") :]
    return None
