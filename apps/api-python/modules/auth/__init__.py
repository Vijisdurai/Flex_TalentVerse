"""
Auth Module
Handles authentication logic for students and professionals
"""

from .schema import LoginRequest, LoginResponse, UserData
from .service import AuthService

__all__ = ["LoginRequest", "LoginResponse", "UserData", "AuthService"]
