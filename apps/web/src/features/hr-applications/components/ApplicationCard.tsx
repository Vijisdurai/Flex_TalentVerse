import React from 'react'
import { Application, ApplicationStatus } from '../types/application.types'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface ApplicationCardProps {
    app: Application
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Theme Styles
    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const borderColor = isDark ? '#374151' : '#F3F4F6'
    const textColor = isDark ? '#F9FAFB' : '#262626'
    const textSec = isDark ? '#9CA3AF' : '#6B7280'


    // Status-specific accent colors for borders/highlights
    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case 'Applied': return '#009ADD' // Flex Blue
            case 'In Review': return '#F1B52C' // Gold/Orangeish
            case 'Shortlisted': return '#BA257D' // Fuchsia
            case 'Interview': return '#F1B52C' // Gold
            case 'Selected': return '#82BC00' // Green
            case 'Rejected': return '#EF4444' // Red
            default: return '#E5E7EB'
        }
    }

    const accentColor = getStatusColor(app.status)
    const isInterview = app.status === 'Interview'
    const isSelected = app.status === 'Selected'
    const isRejected = app.status === 'Rejected'
    const isShortlisted = app.status === 'Shortlisted'

    return (
        <div style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: `1px solid ${borderColor}`,
            borderLeft: isSelected ? `4px solid ${accentColor}` : '1px solid #F3F4F6',
            position: 'relative'
        }}>
            {/* Header: Name & Menu */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h4 style={{
                    margin: 0, fontSize: '15px', fontWeight: 'bold',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: textColor
                }}>
                    {app.candidateName}
                </h4>
                <div style={{ color: '#9CA3AF', cursor: 'pointer', fontSize: '18px', lineHeight: '10px' }}>...</div>
            </div>

            {/* Role */}
            <div style={{
                fontSize: '13px', color: textSec, fontFamily: 'Century Gothic, sans-serif', marginBottom: '12px'
            }}>
                {app.role}
            </div>

            {/* Tags / Meta Information */}
            <div style={{ marginBottom: '16px' }}>
                {/* Special styling for different states based on image */}

                {/* Shortlisted: Strong Match Tag */}
                {isShortlisted && app.tags?.includes('Strong Match') && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px',
                        color: '#10B981', fontSize: '12px', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        <CheckCircleIcon size={12} /> Strong Match
                    </div>
                )}

                {/* Interview: Time Highlight */}
                {isInterview && app.appliedAt.includes('Tomorrow') && (
                    <div style={{
                        display: 'inline-block', backgroundColor: '#FFF7ED', color: '#C2410C',
                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                        border: '1px solid #FFEDD5', fontFamily: 'Century Gothic, sans-serif', marginBottom: '8px'
                    }}>
                        📅 {app.appliedAt}
                    </div>
                )}

                {/* Selected: Status Highlight */}
                {isSelected && (
                    <div style={{
                        color: '#82BC00', fontSize: '13px', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif', marginBottom: '8px'
                    }}>
                        {app.appliedAt}
                    </div>
                )}

                {/* Normal Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {app.tags?.filter(t => t !== 'Strong Match' && t !== 'Details').map(tag => (
                        <span key={tag} style={{
                            backgroundColor: isDark ? '#374151' : '#F3F4F6', color: isDark ? '#D1D5DB' : '#4B5563', padding: '2px 8px', borderRadius: '4px',
                            fontSize: '11px', fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            {tag}
                        </span>
                    ))}
                    {app.internalNote && (
                        <span style={{
                            backgroundColor: '#F3F4F6', color: '#9CA3AF', padding: '2px 8px', borderRadius: '4px',
                            fontSize: '11px', fontFamily: 'Century Gothic, sans-serif', fontStyle: 'italic'
                        }}>
                            {app.internalNote}
                        </span>
                    )}
                </div>
            </div>

            {/* Timestamp for Applied/Review/Rejected (if not special) */}
            {!isInterview && !isSelected && app.appliedAt && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '12px', color: '#9CA3AF', fontFamily: 'Century Gothic, sans-serif', marginBottom: '16px'
                }}>
                    <ClockIcon size={12} /> {app.appliedAt}
                </div>
            )}

            {/* Actions */}
            {!isRejected && !isSelected && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                        flex: 1, padding: '6px', borderRadius: '6px', border: `1px solid ${borderColor}`,
                        backgroundColor: isDark ? '#374151' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#374151', fontSize: '12px', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        Profile
                    </button>
                    <button style={{
                        flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #EFF6FF',
                        backgroundColor: isDark ? '#1E3A8A' : '#F0F9FF', color: '#009ADD', fontSize: '12px', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        {isInterview ? 'Score' : (isShortlisted ? 'Schedule' : 'Move')}
                    </button>
                </div>
            )}

            {isSelected && (
                <button style={{
                    width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                }}>
                    View Offer
                </button>
            )}
        </div>
    )
}

const ClockIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
)

const CheckCircleIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
)

export default ApplicationCard
