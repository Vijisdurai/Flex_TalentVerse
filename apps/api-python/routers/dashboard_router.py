"""
Dashboard Router
Protected endpoint with role-based access control
"""

from typing import Optional
from fastapi import APIRouter, Depends, Query
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from core.database import get_db
from core.security import get_current_user
from modules.auth.service import AuthService

router = APIRouter()


def create_error_box(message: str) -> str:
    """
    Generate HTML for a small centered white error box.
    
    Args:
        message: Error message to display
        
    Returns:
        HTML string with styled error box
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access Denied - Flex TalentVerse</title>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}
            body {{
                font-family: 'ITC Avant Garde Gothic Pro', 'Century Gothic', 'Avenir', sans-serif;
                background: linear-gradient(145deg, #0d1117 0%, #161b22 50%, #1a1d24 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }}
            .error-box {{
                background: #FFFFFF;
                border-radius: 12px;
                padding: 32px 48px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 154, 221, 0.1);
                text-align: center;
                max-width: 400px;
            }}
            .error-box h2 {{
                color: #BA257D;
                font-size: 1.25rem;
                margin-bottom: 8px;
            }}
            .error-box p {{
                color: #262626;
                font-size: 1rem;
            }}
            .error-box a {{
                display: inline-block;
                margin-top: 16px;
                color: #009ADD;
                text-decoration: none;
                font-weight: 600;
            }}
            .error-box a:hover {{
                text-decoration: underline;
            }}
        </style>
    </head>
    <body>
        <div class="error-box">
            <h2>Access Denied</h2>
            <p>{message}</p>
            <a href="/login">← Back to Login</a>
        </div>
    </body>
    </html>
    """


def create_dashboard_html(username: str, role: str) -> str:
    """
    Generate HTML for the dashboard welcome page.
    
    Args:
        username: User's username
        role: User's role
        
    Returns:
        HTML string with dashboard content
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - Flex TalentVerse</title>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}
            body {{
                font-family: 'ITC Avant Garde Gothic Pro', 'Century Gothic', 'Avenir', sans-serif;
                background: linear-gradient(145deg, #0d1117 0%, #161b22 50%, #1a1d24 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }}
            .dashboard-box {{
                background: #FFFFFF;
                border-radius: 16px;
                padding: 48px 64px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 154, 221, 0.15);
                text-align: center;
                max-width: 500px;
            }}
            .dashboard-box h1 {{
                color: #009ADD;
                font-size: 1.75rem;
                margin-bottom: 8px;
            }}
            .dashboard-box .welcome {{
                color: #262626;
                font-size: 1.25rem;
                margin-bottom: 16px;
            }}
            .dashboard-box .role-badge {{
                display: inline-block;
                background: linear-gradient(135deg, #009ADD 0%, #005486 100%);
                color: white;
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 0.875rem;
                font-weight: 600;
                text-transform: capitalize;
            }}
            .dashboard-box .logout {{
                display: inline-block;
                margin-top: 24px;
                color: #BA257D;
                text-decoration: none;
                font-weight: 600;
            }}
            .dashboard-box .logout:hover {{
                text-decoration: underline;
            }}
        </style>
    </head>
    <body>
        <div class="dashboard-box">
            <h1>Flex TalentVerse</h1>
            <p class="welcome">Welcome to the dashboard, <strong>{username}</strong>!</p>
            <span class="role-badge">{role}</span>
            <br>
            <a href="/login" class="logout">Logout</a>
        </div>
    </body>
    </html>
    """


@router.get("/", response_class=HTMLResponse)
async def dashboard(
    required_role: Optional[str] = Query(
        None, 
        description="Required role to access dashboard (for testing)"
    ),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Dashboard endpoint with role-based access control.
    
    - Validates JWT token
    - Checks if user exists in database
    - Optionally validates role
    - Returns HTML response
    
    Query Parameters:
        required_role: Optional role to validate against (admin, student, hr, college_placement)
    """
    auth_service = AuthService(db)
    
    # Validate user exists and check role
    validation = auth_service.validate_user_role(
        email=current_user["email"],
        required_role=required_role
    )
    
    if not validation["valid"]:
        if validation["error_type"] == "not_found":
            # User ID/email not found in database
            user_type = required_role if required_role else "user"
            return HTMLResponse(
                content=create_error_box(f"You are not an {user_type}"),
                status_code=404
            )
        elif validation["error_type"] == "role_mismatch":
            # Role doesn't match required user_type
            return HTMLResponse(
                content=create_error_box(f"You are not that {required_role}"),
                status_code=403
            )
    
    # Success - show dashboard
    user = validation["user"]
    return HTMLResponse(
        content=create_dashboard_html(user.username, user.role),
        status_code=200
    )


@router.get("/api", response_model=dict)
async def dashboard_api(
    required_role: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Dashboard API endpoint (returns JSON instead of HTML).
    Useful for frontend SPA integration.
    """
    auth_service = AuthService(db)
    
    validation = auth_service.validate_user_role(
        email=current_user["email"],
        required_role=required_role
    )
    
    if not validation["valid"]:
        user_type = required_role if required_role else "user"
        if validation["error_type"] == "not_found":
            message = f"You are not an {user_type}"
        else:
            message = f"You are not that {user_type}"
        return {
            "success": False,
            "error_type": validation["error_type"],
            "message": message,
            "user_type": user_type
        }
    
    user = validation["user"]
    return {
        "success": True,
        "message": f"Welcome to the dashboard, {user.username}!",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role
        }
    }
