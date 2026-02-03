"""
Auth Module - Service Layer
Business logic for authentication with MySQL database
"""

from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session

from .model import MasterUserAccount, Student, HRUser
from .schema import LoginResponse, UserData, GoogleLoginRequest, RegisterResponse
from core.security import verify_password, create_access_token, hash_password


class AuthService:
    """
    Authentication service handling login logic with MySQL database.
    Validates credentials against master_user_account table.
    """
    
    def __init__(self, db: Session):
        """Initialize with database session"""
        self.db = db
    
    def get_user_by_email(self, email: str) -> Optional[MasterUserAccount]:
        """
        Find user by email address.
        
        Args:
            email: User's email address
            
        Returns:
            MasterUserAccount or None if not found
        """
        return self.db.query(MasterUserAccount).filter(
            MasterUserAccount.email == email
        ).first()
    
    def get_user_by_google_id(self, google_id: str) -> Optional[MasterUserAccount]:
        """
        Find user by Google ID for SSO login.
        
        Args:
            google_id: User's Google ID
            
        Returns:
            MasterUserAccount or None if not found
        """
        return self.db.query(MasterUserAccount).filter(
            MasterUserAccount.google_id == google_id
        ).first()
    
    def get_user_by_id(self, user_id: int) -> Optional[MasterUserAccount]:
        """
        Find user by ID.
        
        Args:
            user_id: User's ID
            
        Returns:
            MasterUserAccount or None if not found
        """
        return self.db.query(MasterUserAccount).filter(
            MasterUserAccount.id == user_id
        ).first()
    
    def update_last_login(self, user: MasterUserAccount) -> None:
        """
        Update user's last_login timestamp.
        
        Args:
            user: User model instance
        """
        user.last_login = datetime.utcnow()
        self.db.commit()
    
    def login_with_password(
        self,
        email: str,
        password: str,
        user_type: str = "student",
        remember_me: bool = False
    ) -> LoginResponse:
        """
        Authenticate user with email and password.
        
        Args:
            email: User's email
            password: Plain text password
            user_type: Login mode selected by user ('student' or 'professional')
            remember_me: Whether to extend token expiration
            
        Returns:
            LoginResponse with JWT token and user data
            
        Raises:
            ValueError: If credentials are invalid or role mismatch
        """
        # Find user by email
        user = self.get_user_by_email(email)
        
        if not user:
            raise ValueError("You are not registered with us. Please create an account.")
        
        # Define professional roles
        professional_roles = ['hr', 'college_placement', 'admin']
        
        # Validate role against selected login mode
        if user_type == 'student':
            # Student login mode - only 'student' role allowed
            if user.role != 'student':
                raise ValueError("You are not a student. Please use the Professional login.")
        elif user_type == 'professional':
            # Professional login mode - only hr, college_placement, admin allowed
            if user.role not in professional_roles:
                raise ValueError("You are not a professional. Please use the Student login.")
        
        # Verify password
        # Check if password is bcrypt hashed (starts with $2b$ or $2a$)
        if user.password.startswith('$2b$') or user.password.startswith('$2a$'):
            # Password is hashed - use bcrypt verification
            if not verify_password(password, user.password):
                raise ValueError("Invalid password")
        else:
            # Password is plain text (development only) - direct comparison
            if password != user.password:
                raise ValueError("Invalid password")
        
        # Update last login timestamp
        self.update_last_login(user)
        
        # Generate JWT token
        token = create_access_token(
            email=user.email,
            role=user.role,
            username=user.username
        )
        
        # Log successful login
        print(f"[AUTH] Login successful for {email} as {user.role}")
        
        return LoginResponse(
            token=token,
            user=UserData(
                id=user.id,
                email=user.email,
                username=user.username,
                role=user.role
            ),
            message=f"Login successful as {user.role}"
        )
    
    def login_with_google(self, google_id: str, email: str) -> LoginResponse:
        """
        Authenticate user with Google SSO (Students Only).
        
        Args:
            google_id: Google ID from verified token
            email: Email from verified Google token
            
        Returns:
            LoginResponse with JWT token and user data
            
        Raises:
            ValueError: If user not found or not a student
        """
        # First try to find by google_id
        user = self.get_user_by_google_id(google_id)
        
        # If not found by google_id, try email and auto-link
        if not user:
            user = self.get_user_by_email(email)
            
            # Auto-link Google ID to existing account
            if user and not user.google_id:
                user.google_id = google_id
                self.db.commit()
                print(f"[AUTH] Auto-linked Google ID for {email}")
        
        # User not found at all
        if not user:
            raise ValueError("You are not registered with us. Please create an account first.")
        
        # STUDENT-ONLY CHECK: Google Sign-In is restricted to students
        if user.role != 'student':
            raise ValueError("Google Sign-In is only available for students. Please use email/password login.")
        
        # Update last login timestamp
        self.update_last_login(user)
        
        # Generate JWT token
        token = create_access_token(
            email=user.email,
            role=user.role,
            username=user.username
        )
        
        print(f"[AUTH] Google login successful for {email} as {user.role}")
        
        return LoginResponse(
            token=token,
            user=UserData(
                id=user.id,
                email=user.email,
                username=user.username,
                role=user.role
            ),
            message=f"Google login successful as {user.role}"
        )
    
    def validate_user_role(
        self,
        email: str,
        required_role: Optional[str] = None
    ) -> dict:
        """
        Validate user exists and optionally check role.
        
        Args:
            email: User's email from JWT
            required_role: Optional role to check against
            
        Returns:
            Dict with validation result
        """
        user = self.get_user_by_email(email)
        
        if not user:
            return {
                "valid": False,
                "error_type": "not_found",
                "message": "User not found"
            }
        
        if required_role and user.role != required_role:
            return {
                "valid": False,
                "error_type": "role_mismatch",
                "message": f"Required role: {required_role}, User role: {user.role}",
                "user_role": user.role
            }
        
        return {
            "valid": True,
            "user": user
        }

    def get_student_by_email_and_name(self, email: str, full_name: str) -> Optional[Student]:
        """
        Find student in students table by email and full name.
        
        Args:
            email: Student's email address
            full_name: Student's full name
            
        Returns:
            Student or None if not found
        """
        return self.db.query(Student).filter(
            Student.email == email,
            Student.full_name == full_name
        ).first()
    
    def get_student_by_email(self, email: str) -> Optional[Student]:
        """
        Find student in students table by email only.
        
        Args:
            email: Student's email address
            
        Returns:
            Student or None if not found
        """
        return self.db.query(Student).filter(
            Student.email == email
        ).first()

    def register_student(
        self,
        full_name: str,
        email: str,
        password: str
    ) -> RegisterResponse:
        """
        Register a new student account.
        
        First validates that the student exists in the students table,
        then creates an account in master_user_account.
        
        Args:
            full_name: Student's full name
            email: Student's email
            password: Plain text password (will be hashed)
            
        Returns:
            RegisterResponse with success message and user ID
            
        Raises:
            ValueError: If student not found in students table or already registered
        """
        # Check if user already exists in master_user_account
        existing_user = self.get_user_by_email(email)
        if existing_user:
            raise ValueError("An account with this email already exists. Please login instead.")
        
        # Check if student exists in students table
        student = self.get_student_by_email(email)
        if not student:
            raise ValueError("Your college is not registered with us. Please contact your college administration.")
        
        # Verify the name matches
        if student.full_name.lower() != full_name.lower():
            raise ValueError("The name you entered does not match our records. Please use the name registered with your college.")
        
        # Hash the password
        hashed_password = hash_password(password)
        
        # Create new user account
        new_user = MasterUserAccount(
            username=full_name,
            email=email,
            password=hashed_password,
            role='student',
            created_at=datetime.utcnow()
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        print(f"[AUTH] Student account created for {email}")
        
        return RegisterResponse(
            message="Account created successfully! You can now login.",
            user_id=new_user.id
        )

    def get_hr_by_email(self, email: str) -> Optional[HRUser]:
        """
        Find HR user in hr_users table by email.
        
        Args:
            email: HR user's email address
            
        Returns:
            HRUser or None if not found
        """
        return self.db.query(HRUser).filter(
            HRUser.email == email
        ).first()

    def register_hr(
        self,
        full_name: str,
        email: str,
        password: str
    ) -> RegisterResponse:
        """
        Register a new HR account.
        
        First validates that the HR user exists in the hr_users table,
        then creates an account in master_user_account.
        
        Args:
            full_name: HR user's full name
            email: HR user's email
            password: Plain text password (will be hashed)
            
        Returns:
            RegisterResponse with success message and user ID
            
        Raises:
            ValueError: If HR user not found in hr_users table or already registered
        """
        # Check if user already exists in master_user_account
        existing_user = self.get_user_by_email(email)
        if existing_user:
            raise ValueError("An account with this email already exists. Please login instead.")
        
        # Check if HR user exists in hr_users table
        hr_user = self.get_hr_by_email(email)
        if not hr_user:
            raise ValueError("Your organization is not registered with us. Please contact your HR administrator.")
        
        # Verify the name matches
        if hr_user.full_name.lower() != full_name.lower():
            raise ValueError("The name you entered does not match our records. Please use the name registered with your organization.")
        
        # Hash the password
        hashed_password = hash_password(password)
        
        # Create new user account
        new_user = MasterUserAccount(
            username=full_name,
            email=email,
            password=hashed_password,
            role='hr',
            created_at=datetime.utcnow()
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        print(f"[AUTH] HR account created for {email}")
        
        return RegisterResponse(
            message="Account created successfully! You can now login.",
            user_id=new_user.id
        )

    def register_student_with_google(
        self,
        google_id: str,
        email: str,
        full_name: str
    ) -> RegisterResponse:
        """
        Register a new student account using Google SSO.
        
        Validates that the student exists in the students table,
        then creates an account in master_user_account with Google ID.
        
        Args:
            google_id: Google user ID
            email: Email from Google
            full_name: Name from Google profile
            
        Returns:
            RegisterResponse with success message and user ID
            
        Raises:
            ValueError: If student not found or already registered
        """
        # Check if user already exists in master_user_account
        existing_user = self.get_user_by_email(email)
        if existing_user:
            raise ValueError("An account with this email already exists. Please login instead.")
        
        # Check if Google ID is already linked
        existing_google = self.get_user_by_google_id(google_id)
        if existing_google:
            raise ValueError("This Google account is already linked to another user. Please login instead.")
        
        # Check if student exists in students table
        student = self.get_student_by_email(email)
        if not student:
            raise ValueError("Your college is not registered with us. Please contact your college administration.")
        
        # Verify the name matches (case-insensitive, flexible matching)
        student_name_lower = student.full_name.lower().strip()
        google_name_lower = full_name.lower().strip()
        
        # Check if names match (either exact or first name matches)
        name_matches = (
            student_name_lower == google_name_lower or
            student_name_lower.split()[0] == google_name_lower.split()[0]  # First name match
        )
        
        if not name_matches:
            raise ValueError(f"The name on your Google account ({full_name}) does not match our records ({student.full_name}). Please use the Google account registered with your college.")
        
        # Create new user account with Google ID (no password needed)
        new_user = MasterUserAccount(
            username=student.full_name,  # Use the name from student records
            email=email,
            password="",  # No password for Google-only accounts
            role='student',
            google_id=google_id,
            created_at=datetime.utcnow()
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        print(f"[AUTH] Student account created via Google for {email}")
        
        return RegisterResponse(
            message="Account created successfully! You can now login with Google.",
            user_id=new_user.id
        )
