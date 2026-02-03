"""
Flex TalentVerse - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import auth_router, dashboard_router

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Flex TalentVerse API",
    description="Backend API for Flex TalentVerse platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(dashboard_router.router, prefix="/api/v1/dashboard", tags=["Dashboard"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "Flex TalentVerse API is running"}


@app.get("/api/health")
async def health_check():
    """API health check"""
    return {"status": "healthy", "version": "1.0.0"}
