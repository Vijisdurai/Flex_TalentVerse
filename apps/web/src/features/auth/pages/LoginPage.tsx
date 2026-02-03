import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, useGoogleLogin, TokenResponse } from '@react-oauth/google'
import AuthContainer from '../../../shared/components/AuthContainer'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import { authApi } from '../../../shared/api/auth'
import './LoginPage.css'

// Google Client ID from environment or fallback
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Custom Google Login Button Component
interface GoogleLoginButtonProps {
    onSuccess: (credential: string) => void
    onError: () => void
    isLoading: boolean
}

function GoogleLoginButton({ onSuccess, onError, isLoading }: GoogleLoginButtonProps) {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: TokenResponse) => {
            try {
                // Pass the access token to backend which will verify with Google
                onSuccess(tokenResponse.access_token)
            } catch {
                onError()
            }
        },
        onError: () => onError(),
        flow: 'implicit'
    })

    return (
        <button
            type="button"
            className="google-login-btn"
            onClick={() => login()}
            disabled={isLoading}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                padding: '14px 24px',
                fontSize: '18px',
                fontWeight: '400',
                fontFamily: "'ITC Avant Garde Gothic Pro', 'Century Gothic', sans-serif",
                color: '#262626',
                backgroundColor: '#ffffff',
                border: '2px solid #e5e5e5',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            <svg width="28" height="28" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
        </button>
    )
}

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [userType, setUserType] = useState<'student' | 'professional'>('student')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Send login request with userType
            const response = await authApi.login({ 
                email, 
                password, 
                userType 
            })

            // Store token in localStorage
            localStorage.setItem('auth_token', response.token)
            console.log('Login successful:', response)
            
            // Redirect to dashboard
            navigate('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSuccess = async (accessToken: string) => {
        if (!accessToken) {
            setError('Google Sign-In failed: No credential received')
            return
        }
        
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await authApi.googleLogin({ 
                credential: accessToken 
            })
            
            localStorage.setItem('auth_token', response.token)
            console.log('Google login successful:', response)
            navigate('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleError = () => {
        setError('Google Sign-In was cancelled or failed')
    }

    return (
        <div className="login-page animate-fade-in-up">
            <AuthContainer
                title="Welcome Back"
                subtitle="Sign in to access your Flex TalentVerse account"
            >
                {/* User type toggle for Student/Professional login */}
                <div className="login-toggle">
                    <button
                        type="button"
                        className={`login-toggle__button ${userType === 'student' ? 'login-toggle__button--active' : ''}`}
                        onClick={() => setUserType('student')}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        className={`login-toggle__button ${userType === 'professional' ? 'login-toggle__button--active' : ''}`}
                        onClick={() => setUserType('professional')}
                    >
                        Professional
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-form__error" style={{
                            padding: '12px',
                            background: '#fee2e2',
                            border: '1px solid #ef4444',
                            borderRadius: '8px',
                            color: '#b91c1c',
                            marginBottom: '16px',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Google Sign-in at top - only available for students */}
                    {userType === 'student' && GOOGLE_CLIENT_ID && (
                        <>
                            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                                <GoogleLoginButton 
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    isLoading={isLoading}
                                />
                            </GoogleOAuthProvider>

                            <div className="login-form__divider">
                                <span>or</span>
                            </div>
                        </>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-10 5L2 7" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        }
                        required
                    />

                    <div className="login-form__options">
                        <label className="login-form__remember">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="login-form__forgot">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        Log In
                    </Button>
                </form>

                <p className="login-page__footer">
                    Don't have an account?{' '}
                    <Link to="/create-account">Sign up</Link>
                </p>
            </AuthContainer>
        </div>
    )
}

export default LoginPage
