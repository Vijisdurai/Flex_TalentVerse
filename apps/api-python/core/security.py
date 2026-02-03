"""
JWT Utilities
Token generation and validation for authentication
"""

import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

# Load environment variables
load_dotenv()

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "flex-talentverse-secret-key-change-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

# HTTP Bearer security scheme
security = HTTPBearer()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a bcrypt hash.
    
    Args:
        plain_password: The plain text password
        hashed_password: The bcrypt hashed password from DB
        
    Returns:
        True if password matches, False otherwise
    """
    # Truncate to 72 bytes (bcrypt limit)
    password_bytes = plain_password.encode('utf-8')[:72]
    return bcrypt.checkpw(password_bytes, hashed_password.encode('utf-8'))


def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password: Plain text password
        
    Returns:
        Bcrypt hashed password
    """
    # Truncate to 72 bytes (bcrypt limit) and hash
    password_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password_bytes, salt).decode('utf-8')


def create_access_token(
    email: str,
    role: str,
    username: Optional[str] = None,
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a JWT access token.
    
    Args:
        email: User's email (will be 'sub' claim)
        role: User's role
        username: Optional username
        expires_delta: Optional custom expiration time
        
    Returns:
        Encoded JWT token string
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    
    payload = {
        "sub": email,
        "role": role,
        "username": username,
        "exp": expire,
        "iat": datetime.utcnow()
    }
    
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    """
    Decode and validate a JWT token.
    
    Args:
        token: The JWT token string
        
    Returns:
        Decoded token payload
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"}
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Dependency to get current user from JWT token.
    
    Args:
        credentials: HTTP Authorization header with Bearer token
        
    Returns:
        Decoded user data from token
    """
    token = credentials.credentials
    payload = decode_token(token)
    
    email = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return {
        "email": email,
        "role": payload.get("role"),
        "username": payload.get("username")
    }


def require_role(allowed_roles: list):
    """
    Dependency factory to check if user has required role.
    
    Args:
        allowed_roles: List of allowed role strings
        
    Returns:
        Dependency function that validates user role
    """
    async def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{current_user['role']}' is not authorized. Required: {allowed_roles}"
            )
        return current_user
    return role_checker


# Google OAuth Configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")


def verify_google_token(token: str) -> dict:
    """
    Verify Google access token and extract user info.
    
    Args:
        token: Google access token from frontend
        
    Returns:
        Dict with google_id, email, name
        
    Raises:
        ValueError: If token is invalid
    """
    import requests
    
    try:
        # Use Google's userinfo endpoint to verify access token and get user info
        response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {token}'}
        )
        
        if response.status_code != 200:
            raise ValueError('Invalid access token')
        
        userinfo = response.json()
        
        if 'sub' not in userinfo or 'email' not in userinfo:
            raise ValueError('Invalid user info from Google')
        
        return {
            'google_id': userinfo['sub'],
            'email': userinfo['email'],
            'name': userinfo.get('name', ''),
            'picture': userinfo.get('picture', '')
        }
    except requests.RequestException as e:
        raise ValueError(f"Failed to verify Google token: {str(e)}")
    except Exception as e:
        raise ValueError(f"Invalid Google token: {str(e)}")
