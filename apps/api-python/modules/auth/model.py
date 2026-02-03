"""
Auth Module - SQLAlchemy Model
Model for master_user_account table (read-only, do not modify table structure)
"""

from datetime import datetime
from sqlalchemy import Column, BigInteger, String, DateTime, Enum as SQLEnum
from core.database import Base


class MasterUserAccount(Base):
    """
    SQLAlchemy model for master_user_account table.
    Maps to existing MySQL table - DO NOT modify table structure.
    """
    __tablename__ = "master_user_account"
    
    id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)  # bcrypt hashed
    role = Column(
        SQLEnum('admin', 'student', 'hr', 'college_placement', name='user_role'),
        nullable=False,
        index=True
    )
    google_id = Column(String(255), nullable=True, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"


class Student(Base):
    """
    SQLAlchemy model for students table.
    Used to verify student eligibility before account creation.
    """
    __tablename__ = "students"
    
    id = Column(BigInteger, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    college_id = Column(BigInteger, nullable=True)
    
    def __repr__(self):
        return f"<Student(id={self.id}, email='{self.email}', full_name='{self.full_name}')>"


class HRUser(Base):
    """
    SQLAlchemy model for hr_users table.
    Used to verify HR eligibility before account creation.
    """
    __tablename__ = "hr_users"
    
    id = Column(BigInteger, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    role = Column(String(255), nullable=True)
    
    def __repr__(self):
        return f"<HRUser(id={self.id}, email='{self.email}', full_name='{self.full_name}')>"
