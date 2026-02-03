"""
Authentication Router
Handles login endpoints for email/password and Google SSO
"""

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from core.security import verify_google_token
from core.email import send_college_access_request_email
from modules.auth.schema import (
    LoginRequest, LoginResponse, GoogleLoginRequest, 
    RegisterRequest, RegisterResponse,
    CollegeAccessRequest, CollegeAccessResponse,
    GoogleRegisterRequest, GoogleRegisterResponse
)
from modules.auth.service import AuthService

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login endpoint for email/password authentication.
    
    - **email**: User's email address
    - **password**: User's password
    - **userType**: Role type (student, professional, admin, hr, college_placement)
    - **rememberMe**: Optional flag for extended session
    
    Returns JWT token and user data on success.
    """
    auth_service = AuthService(db)
    
    try:
        result = auth_service.login_with_password(
            email=request.email,
            password=request.password,
            user_type=request.user_type,
            remember_me=request.remember_me
        )
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.post("/register", response_model=RegisterResponse)
async def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Register a new user account.
    
    For students:
    - Validates that the student exists in the students table
    - Creates account in master_user_account if validation passes
    
    - **role**: User role (student or hr)
    - **fullName**: User's full name
    - **email**: User's email address
    - **password**: User's password
    - **agreeTerms**: Must agree to terms
    
    Returns success message and user ID on success.
    """
    if not request.agree_terms:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must agree to the Terms of Service and Privacy Policy"
        )
    
    auth_service = AuthService(db)
    
    try:
        if request.role == 'student':
            result = auth_service.register_student(
                full_name=request.full_name,
                email=request.email,
                password=request.password
            )
            return result
        elif request.role == 'hr':
            result = auth_service.register_hr(
                full_name=request.full_name,
                email=request.email,
                password=request.password
            )
            return result
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid role specified."
            )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/register/google", response_model=GoogleRegisterResponse)
async def register_google(
    request: GoogleRegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Register a new student account using Google SSO.
    
    - **credential**: Google access token from frontend Sign-In
    
    Validates student exists in students table, then creates account.
    Returns success message and user ID.
    """
    # Verify Google token and extract user info
    try:
        google_user = verify_google_token(request.credential)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
    
    auth_service = AuthService(db)
    
    try:
        result = auth_service.register_student_with_google(
            google_id=google_user['google_id'],
            email=google_user['email'],
            full_name=google_user['name']
        )
        return GoogleRegisterResponse(
            message=result.message,
            user_id=result.user_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login/google", response_model=LoginResponse)
async def login_google(
    request: GoogleLoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login endpoint for Google SSO authentication (Students Only).
    
    - **credential**: Google ID token from frontend Sign-In
    
    Returns JWT token and user data on success.
    """
    # Verify Google token and extract user info
    try:
        google_user = verify_google_token(request.credential)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
    
    auth_service = AuthService(db)
    
    try:
        result = auth_service.login_with_google(
            google_id=google_user['google_id'],
            email=google_user['email']
        )
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.get("/me")
async def get_current_user_info(
    db: Session = Depends(get_db),
    current_user: dict = Depends(lambda: None)  # Will be replaced with proper dependency
):
    """
    Get current authenticated user's information.
    Requires valid JWT token.
    """
    from core.security import get_current_user as get_user_from_token
    # This will be called with the actual dependency
    pass


@router.post("/college-access", response_model=CollegeAccessResponse)
async def request_college_access(
    request: CollegeAccessRequest
):
    """
    Submit a college access request.
    
    Sends an email to support with the college details for approval.
    
    - **collegeName**: Name of the college/university
    - **collegeAddress**: Full institutional address
    - **adminName**: Name of the requesting admin
    - **officialEmail**: Official institutional email
    - **contactNumber**: Contact phone number
    
    Returns success message and request ID for tracking.
    """
    try:
        request_id = send_college_access_request_email(
            college_name=request.college_name,
            college_address=request.college_address,
            admin_name=request.admin_name,
            official_email=request.official_email,
            contact_number=request.contact_number
        )
        
        return CollegeAccessResponse(
            message="Your request has been submitted successfully. We will contact you within 2-3 business days.",
            request_id=request_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
