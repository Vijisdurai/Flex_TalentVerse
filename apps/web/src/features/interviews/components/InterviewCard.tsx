import React from 'react'
import { Interview } from '../types/interview.types'
import InterviewStatusBadge from './InterviewStatusBadge'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface InterviewCardProps {
    interview: Interview
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const textSub = isDark ? '#9CA3AF' : '#6B7280'

    return (
        <div style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${border}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: textMain
                    }}>
                        {interview.candidateName}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: textSub, fontFamily: 'Century Gothic, sans-serif' }}>
                        {interview.candidateRole}
                    </p>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: textSub }}>⋮</button>
            </div>

            {/* Time & Platform */}
            <div style={{
                backgroundColor: isDark ? '#374151' : '#F9FAFB',
                padding: '12px', borderRadius: '8px',
                fontSize: '13px', fontFamily: 'Century Gothic, sans-serif', color: textMain,
                display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🕒 {interview.startTime} - {interview.endTime}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {interview.platform === 'In-Person' ? '📍' : '📹'} {interview.platform} {interview.location && `- ${interview.location}`}
                </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <InterviewStatusBadge type={interview.type} kind="type" />
                <InterviewStatusBadge status={interview.status} kind="status" />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button style={{
                    flex: 1, padding: '8px', borderRadius: '6px',
                    border: `1px solid ${border}`, backgroundColor: 'transparent',
                    color: textMain, fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Details
                </button>
                <button style={{
                    flex: 1, padding: '8px', borderRadius: '6px',
                    border: 'none', backgroundColor: '#E0F2FE', // Light Blue for action
                    color: '#009ADD', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    {interview.status === 'Confirmed' ? 'Start' : 'Reschedule'}
                </button>
            </div>
        </div>
    )
}

export default InterviewCard
