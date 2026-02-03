"""
Auth Module - Pydantic Schemas
Defines request/response models for authentication
"""

from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# --- Login Schemas ---

class LoginRequest(BaseModel):
    """Login request payload for email/password authentication"""
    model_config = ConfigDict(populate_by_name=True)
    
    email: EmailStr
    password: str
    user_type: Literal["student", "professional", "admin", "hr", "college_placement"] = Field(
        default="student", 
        alias="userType"
    )
    remember_me: Optional[bool] = Field(
        default=False, 
        alias="rememberMe"
    )


class GoogleLoginRequest(BaseModel):
    """Login request payload for Google SSO - accepts credential token from frontend"""
    credential: str  # The ID token from Google Sign-In
    
    model_config = ConfigDict(populate_by_name=True)


class UserData(BaseModel):
    """User data returned after successful login"""
    id: int
    email: str
    username: str
    role: Literal["student", "professional", "admin", "hr", "college_placement"]


class LoginResponse(BaseModel):
    """Login response payload with JWT token"""
    token: str
    user: UserData
    message: str


class TokenPayload(BaseModel):
    """JWT token payload structure"""
    sub: str  # email
    role: str
    username: Optional[str] = None
    exp: int
    iat: int


# --- Dashboard Schemas ---

class DashboardResponse(BaseModel):
    """Dashboard response for authenticated users"""
    success: bool
    message: str
    username: Optional[str] = None
    role: Optional[str] = None


class ErrorResponse(BaseModel):
    """Error response with HTML content"""
    detail: str
    html: Optional[str] = None


# --- Registration Schemas ---

class RegisterRequest(BaseModel):
    """Registration request payload"""
    model_config = ConfigDict(populate_by_name=True)
    
    role: Literal["student", "hr"] = Field(..., description="User role")
    full_name: str = Field(..., alias="fullName", min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=255)
    agree_terms: bool = Field(..., alias="agreeTerms")


class RegisterResponse(BaseModel):
    """Registration response payload"""
    message: str
    user_id: int = Field(..., alias="userId", serialization_alias="userId")
    
    model_config = ConfigDict(populate_by_name=True, by_alias=True)


# --- College Access Request Schemas ---

class CollegeAccessRequest(BaseModel):
    """College access request payload"""
    model_config = ConfigDict(populate_by_name=True)
    
    college_name: str = Field(..., alias="collegeName", min_length=2, max_length=255)
    college_address: str = Field(..., alias="collegeAddress", min_length=5, max_length=500)
    admin_name: str = Field(..., alias="adminName", min_length=2, max_length=255)
    official_email: EmailStr = Field(..., alias="officialEmail")
    contact_number: str = Field(..., alias="contactNumber", min_length=10, max_length=20)


class CollegeAccessResponse(BaseModel):
    """College access response payload"""
    message: str
    request_id: str = Field(..., alias="requestId", serialization_alias="requestId")
    
    model_config = ConfigDict(populate_by_name=True, by_alias=True)


class GoogleRegisterRequest(BaseModel):
    """Google registration request payload"""
    credential: str  # Google access token
    
    model_config = ConfigDict(populate_by_name=True)


class GoogleRegisterResponse(BaseModel):
    """Google registration response payload"""
    message: str
    user_id: int = Field(..., alias="userId", serialization_alias="userId")
    
    model_config = ConfigDict(populate_by_name=True, by_alias=True)


# --- Legacy schemas for backward compatibility ---

class StoredSession(BaseModel):
    """Temporarily stored session data (legacy)"""
    user_id: str
    email: str
    user_type: Literal["student", "professional"]
    token: str
    login_time: str
    remember_me: bool
