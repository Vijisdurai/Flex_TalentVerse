import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../../shared/components/AuthContainer'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import RoleCard from '../../../shared/components/RoleCard'
import { authApi } from '../../../shared/api/auth'
import './CreateAccountPage.css'

type UserRole = 'student' | 'hr'

function CreateAccountPage() {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!selectedRole || password !== confirmPassword) return

        setIsLoading(true)
        setError(null)

        try {
            await authApi.register({
                role: selectedRole,
                fullName,
                email,
                password,
                agreeTerms
            })
            setIsSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="create-account-page animate-fade-in-up">
                <AuthContainer
                    title="Account CREATED"
                    subtitle="Your account has been created successfully"
                >
                    <div className="create-account-success">
                        <div className="create-account-success__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <p>You can now log in with your credentials.</p>
                        <div className="create-account-success__actions">
                            <Link to="/login">
                                <Button variant="primary" size="lg">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </AuthContainer>
            </div>
        )
    }

    return (
        <div className="create-account-page animate-fade-in-up">
            <AuthContainer
                title="Create Account"
                subtitle="Join Flex TalentVerse and unlock your potential"
            >
                {error && (
                    <div className="create-account-form__error" style={{
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
                <form onSubmit={handleSubmit} className="create-account-form">
                    <div className="create-account-form__section">
                        <h3 className="create-account-form__section-title">I am a...</h3>
                        <div className="create-account-form__roles">
                            <RoleCard
                                title="Student"
                                description=""
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                }
                                selected={selectedRole === 'student'}
                                onClick={() => setSelectedRole('student')}
                            />
                            <RoleCard
                                title="HR Professional"
                                description=""
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                }
                                selected={selectedRole === 'hr'}
                                onClick={() => setSelectedRole('hr')}
                            />
                        </div>
                    </div>

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 1 0-16 0" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
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

                    <div className="create-account-form__password-row">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
                            required
                        />
                    </div>

                    <label className="create-account-form__terms">
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            required
                        />
                        <span>
                            I agree to the{' '}
                            <a href="#terms">Terms of Service</a> and{' '}
                            <a href="#privacy">Privacy Policy</a>
                        </span>
                    </label>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        disabled={!selectedRole || !agreeTerms}
                    >
                        Create Account
                    </Button>

                    <div className="create-account-form__divider">
                        <span>or continue with</span>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        }
                    >
                        Sign up with Google
                    </Button>

                    <div className="create-account-form__college-card">
                        <div className="create-account-form__college-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18" />
                                <path d="M9 8h1" />
                                <path d="M9 12h1" />
                                <path d="M9 16h1" />
                                <path d="M14 8h1" />
                                <path d="M14 12h1" />
                                <path d="M14 16h1" />
                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                            </svg>
                        </div>
                        <div className="create-account-form__college-content">
                            <h4>Are you a College Admin?</h4>
                            <p>Request institutional access to showcase your college</p>
                        </div>
                        <Link to="/request-college-access" className="create-account-form__college-link">
                            Request Access →
                        </Link>
                    </div>
                </form>

                <p className="create-account-page__footer">
                    Already have an account?{' '}
                    <Link to="/login">Log In</Link>
                </p>
            </AuthContainer>
        </div>
    )
}

export default CreateAccountPage
