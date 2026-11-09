"""Application settings from environment / .env placeholders."""

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DEFAULT_DB_URL = f"sqlite:///{DATA_DIR / 'store.db'}"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    admin_username: str = "admin"
    admin_password: str = "change-me-please"
    secret_key: str = "replace-with-a-long-random-secret-key"
    access_token_expire_minutes: int = 1440
    database_url: str = DEFAULT_DB_URL
    algorithm: str = "HS256"

    # WeChat mini program (placeholders only — never commit real secrets)
    wx_appid: str = "wxXXXXXXXXXXXXXXXX"
    wx_secret: str = "replace-with-wechat-app-secret"
    # When true (default), skip real jscode2session and mint a deterministic mock openid.
    # Set WX_MOCK_OPENID=0 and real AppID/Secret for production WeChat API.
    wx_mock_openid: bool = True


@lru_cache
def get_settings() -> Settings:
    return Settings()
