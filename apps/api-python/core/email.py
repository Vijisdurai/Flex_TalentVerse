"""
Email Utilities
Sends emails via Gmail SMTP for college access requests
"""

import os
import smtplib
import ssl
import uuid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email Configuration from environment (strip whitespace)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
SMTP_PORT = int(os.getenv("SMTP_PORT", "465").strip())
SMTP_USER = os.getenv("SMTP_USER", "").strip()
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "").strip()
SUPPORT_EMAIL = os.getenv("SUPPORT_EMAIL", "").strip()

# Debug log
print(f"[EMAIL CONFIG] Host: {SMTP_HOST}, Port: {SMTP_PORT}, User: {SMTP_USER[:5]}..., Support: {SUPPORT_EMAIL}")


def send_college_access_request_email(
    college_name: str,
    college_address: str,
    admin_name: str,
    official_email: str,
    contact_number: str
) -> str:
    """
    Send college access request email to support.
    
    Args:
        college_name: Name of the college/university
        college_address: Full address of the institution
        admin_name: Name of the requesting admin
        official_email: Official email of the admin
        contact_number: Contact phone number
        
    Returns:
        Request ID for tracking
        
    Raises:
        ValueError: If email configuration is missing or send fails
    """
    if not SMTP_USER or not SMTP_PASSWORD or not SUPPORT_EMAIL:
        print(f"[EMAIL] Config check failed - User: '{SMTP_USER}', Pass length: {len(SMTP_PASSWORD)}, Support: '{SUPPORT_EMAIL}'")
        raise ValueError("Email configuration is incomplete. Please contact support.")
    
    # Generate unique request ID
    request_id = f"COL-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
    
    # Create email content
    subject = f"[College Approvals] New Access Request - {college_name} ({request_id})"
    
    # HTML email body
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
            .content {{ background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #4b5563; font-size: 12px; text-transform: uppercase; }}
            .value {{ font-size: 16px; color: #111827; margin-top: 4px; }}
            .footer {{ background: #f3f4f6; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }}
            .request-id {{ background: #ddd6fe; color: #5b21b6; padding: 4px 8px; border-radius: 4px; font-weight: bold; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin: 0;">🏛️ New College Access Request</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Flex TalentVerse - College Approvals</p>
            </div>
            <div class="content">
                <p>A new college has requested access to the Flex TalentVerse platform.</p>
                
                <div class="field">
                    <div class="label">Request ID</div>
                    <div class="value"><span class="request-id">{request_id}</span></div>
                </div>
                
                <div class="field">
                    <div class="label">College/University Name</div>
                    <div class="value">{college_name}</div>
                </div>
                
                <div class="field">
                    <div class="label">College Address</div>
                    <div class="value">{college_address}</div>
                </div>
                
                <div class="field">
                    <div class="label">Admin Name</div>
                    <div class="value">{admin_name}</div>
                </div>
                
                <div class="field">
                    <div class="label">Official Email</div>
                    <div class="value"><a href="mailto:{official_email}">{official_email}</a></div>
                </div>
                
                <div class="field">
                    <div class="label">Contact Number</div>
                    <div class="value"><a href="tel:{contact_number}">{contact_number}</a></div>
                </div>
                
                <div class="field">
                    <div class="label">Request Time</div>
                    <div class="value">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0;">This is an automated message from Flex TalentVerse.</p>
                <p style="margin: 5px 0 0 0;">Please review and respond within 2-3 business days.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text fallback
    text_body = f"""
    NEW COLLEGE ACCESS REQUEST
    ==========================
    
    Request ID: {request_id}
    
    College/University Name: {college_name}
    College Address: {college_address}
    Admin Name: {admin_name}
    Official Email: {official_email}
    Contact Number: {contact_number}
    Request Time: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
    
    --
    Flex TalentVerse - College Approvals
    """
    
    # Create message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"Flex TalentVerse <{SMTP_USER}>"
    msg['To'] = SUPPORT_EMAIL
    
    # Attach both plain text and HTML versions
    msg.attach(MIMEText(text_body, 'plain'))
    msg.attach(MIMEText(html_body, 'html'))
    
    try:
        # Connect to SMTP server using SSL (port 465)
        print(f"[EMAIL] Connecting to {SMTP_HOST}:{SMTP_PORT}...")
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
            print(f"[EMAIL] Logging in as {SMTP_USER}...")
            server.login(SMTP_USER, SMTP_PASSWORD)
            print(f"[EMAIL] Sending email to {SUPPORT_EMAIL}...")
            server.send_message(msg)
        
        print(f"[EMAIL] College access request sent: {request_id}")
        return request_id
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"[EMAIL] SMTP authentication failed: {e}")
        raise ValueError("Email authentication failed. Please check your Gmail App Password.")
    except smtplib.SMTPException as e:
        print(f"[EMAIL] SMTP error: {e}")
        raise ValueError("Failed to send email. Please try again later.")
    except Exception as e:
        print(f"[EMAIL] Unexpected error: {e}")
        raise ValueError(f"An error occurred: {str(e)}")
