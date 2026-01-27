import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../../shared/components/AuthContainer'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import { authApi } from '../../../shared/api/auth'
import './RequestCollegeAccessPage.css'

function RequestCollegeAccessPage() {
    const [collegeName, setCollegeName] = useState('')
    const [collegeAddress, setCollegeAddress] = useState('')
    const [officialEmail, setOfficialEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [adminName, setAdminName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await authApi.requestCollegeAccess({
                collegeName,
                collegeAddress,
                adminName,
                officialEmail,
                contactNumber
            })
            setIsSubmitted(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Request failed')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="request-college-page animate-fade-in-up">
                <AuthContainer
                    title="Request SUBMITTED"
                    subtitle="We'll review your request and get back to you soon"
                >
                    <div className="request-college-success">
                        <div className="request-college-success__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <p>
                            We'll contact you at <strong>{officialEmail}</strong> within 2-3 business days.
                        </p>
                        <div className="request-college-success__actions">
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
        <div className="request-college-page animate-fade-in-up">
            <AuthContainer
                title="Request College Access"
                subtitle="Provide your institutional details for verification"
            >
                {error && (
                    <div className="request-college-form__error" style={{
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
                <form onSubmit={handleSubmit} className="request-college-form">
                    <div className="request-college-form__info">
                        <div className="request-college-form__info-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        </div>
                        <span>Verification required for College Admin access</span>
                    </div>

                    <Input
                        label="College/University Name"
                        type="text"
                        placeholder="Enter institutional name"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18" />
                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                <path d="M9 8h1" />
                                <path d="M9 12h1" />
                                <path d="M14 8h1" />
                                <path d="M14 12h1" />
                            </svg>
                        }
                        required
                    />

                    <div className="request-college-form__textarea-wrapper">
                        <label htmlFor="college-address" className="request-college-form__label">
                            College Address
                        </label>
                        <textarea
                            id="college-address"
                            className="request-college-form__textarea"
                            placeholder="Enter complete institutional address"
                            value={collegeAddress}
                            onChange={(e) => setCollegeAddress(e.target.value)}
                            rows={3}
                            required
                        />
                    </div>

                    <Input
                        label="Your Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 1 0-16 0" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Official Email"
                        type="email"
                        placeholder="you@college.edu"
                        value={officialEmail}
                        onChange={(e) => setOfficialEmail(e.target.value)}
                        helperText="Use your official institutional email for faster verification"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-10 5L2 7" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Contact Number"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        }
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        Submit Request
                    </Button>
                </form>

                <p className="request-college-page__footer">
                    <Link to="/create-account">← Back to Create Account</Link>
                </p>
            </AuthContainer>
        </div>
    )
}

export default RequestCollegeAccessPage
