"""Auth endpoints."""

from fastapi import APIRouter, HTTPException, status

from app.auth import create_access_token, verify_admin_credentials
from app.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest) -> TokenResponse:
    if not verify_admin_credentials(body.username, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(body.username)
    return TokenResponse(access_token=token)


@router.post("/logout")
def logout() -> dict:
    """Stateless JWT: client discards the token. Endpoint kept for API symmetry."""
    return {"ok": True}
