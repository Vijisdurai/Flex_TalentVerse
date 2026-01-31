import React from 'react'
import { Interview } from '../types/interview.types'
import InterviewStatusBadge from './InterviewStatusBadge'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface LiveNowCardProps {
    interview: Interview
}

const LiveNowCard: React.FC<LiveNowCardProps> = ({ interview }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const textSub = isDark ? '#9CA3AF' : '#6B7280'

    const handleJoin = () => {
        if (interview.link) {
            window.open(interview.link, '_blank')
        } else {
            alert('No meeting link available.')
        }
    }

    return (
        <div style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${border}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column', // Simplified for list view, or could be row
            gap: '20px',
            maxWidth: '500px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: textMain
                    }}>
                        {interview.candidateName}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: textSub, fontFamily: 'Century Gothic, sans-serif' }}>
                        {interview.candidateRole}
                    </p>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: textSub }}>⋮</button>
            </div>

            {/* Time & Platform */}
            <div style={{
                display: 'flex', gap: '16px',
                backgroundColor: isDark ? '#374151' : '#F9FAFB',
                padding: '12px', borderRadius: '8px',
                fontSize: '14px', fontFamily: 'Century Gothic, sans-serif', color: textMain
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🕒 {interview.startTime} - {interview.endTime} ({interview.status})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📹 {interview.platform}
                </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <InterviewStatusBadge type={interview.type} kind="type" />
                <InterviewStatusBadge status="Same as Live essentially" kind="status" /> {/* Hardcoded per design "In Progress" style usually */}
                <span style={{
                    backgroundColor: '#FEF2F2', color: '#EF4444',
                    padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                    fontFamily: 'Century Gothic, sans-serif'
                }}>
                    In Progress
                </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                <button style={{
                    flex: 1, padding: '10px', borderRadius: '8px',
                    border: `1px solid ${border}`, backgroundColor: 'transparent',
                    color: textMain, fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Details
                </button>
                <button
                    onClick={handleJoin}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '8px',
                        border: 'none', backgroundColor: '#EF4444', // Red for Join Call
                        color: '#FFFFFF', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                    Join Call
                </button>
            </div>
        </div>
    )
}

export default LiveNowCard
