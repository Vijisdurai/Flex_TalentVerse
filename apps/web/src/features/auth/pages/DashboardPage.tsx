import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, ApiError } from '../../../shared/api/client'
import './DashboardPage.css'

interface DashboardData {
    success: boolean
    message: string
    error_type?: string
    user_type?: string
    user?: {
        id: number
        email: string
        username: string
        role: string
    }
}

function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [errorType, setErrorType] = useState<string | null>(null)
    const [userData, setUserData] = useState<DashboardData['user'] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('auth_token')
            
            if (!token) {
                navigate('/login')
                return
            }

            try {
                const response = await apiClient.get<DashboardData>('/dashboard/api')
                
                if (response.success && response.user) {
                    setUserData(response.user)
                } else {
                    setError(response.message)
                    setErrorType(response.error_type || 'unknown')
                }
            } catch (err) {
                // Handle API errors with proper messages
                if (err instanceof ApiError) {
                    // Check if the error response has our custom error format
                    if (err.data && err.data.detail) {
                        setError(err.data.detail)
                        setErrorType('api_error')
                    } else if (err.status === 401) {
                        // Token invalid or expired - redirect to login
                        localStorage.removeItem('auth_token')
                        navigate('/login')
                        return
                    } else if (err.status === 404) {
                        setError('You are not an user')
                        setErrorType('not_found')
                    } else if (err.status === 403) {
                        setError('You are not that user')
                        setErrorType('role_mismatch')
                    } else {
                        setError(err.message)
                        setErrorType('api_error')
                    }
                } else {
                    // Network or unknown error
                    setError('An error occurred. Please try again.')
                    setErrorType('unknown')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('auth_token')
        navigate('/login')
    }

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="dashboard-loading__spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-error-box">
                    <p>{error}</p>
                    <button onClick={() => navigate('/login')} className="dashboard-error-box__button">
                        ← Back to Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-page animate-fade-in-up">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>
                        <span className="dashboard-header__flex">Flex</span> TalentVerse
                    </h1>
                </div>

                <div className="dashboard-welcome">
                    <p className="dashboard-welcome__message">
                        Welcome to the dashboard, <strong>{userData?.username}</strong>!
                    </p>
                    <span className="dashboard-welcome__role-badge">
                        {userData?.role}
                    </span>
                </div>

                <div className="dashboard-info">
                    <div className="dashboard-info__item">
                        <span className="dashboard-info__label">Email</span>
                        <span className="dashboard-info__value">{userData?.email}</span>
                    </div>
                    <div className="dashboard-info__item">
                        <span className="dashboard-info__label">User ID</span>
                        <span className="dashboard-info__value">{userData?.id}</span>
                    </div>
                </div>

                <button onClick={handleLogout} className="dashboard-logout">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default DashboardPage
