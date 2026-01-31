import React from 'react'
import { RecruitmentEvent } from '../types/event.types'
import EventStatusBadge from './EventStatusBadge'
import EventStats from './EventStats'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface EventCardProps {
    event: RecruitmentEvent
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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
            gap: '24px',
            marginBottom: '16px'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 'bold',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: textMain
                    }}>
                        {event.name}
                    </h3>
                    <EventStatusBadge status={event.status} />
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: textSub }}>•••</button>
            </div>

            {/* Meta Info */}
            <div style={{
                display: 'flex', gap: '24px',
                fontSize: '14px', fontFamily: 'Century Gothic, sans-serif', color: textSub
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🏢 {event.type}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📅 {event.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📍 {event.location}
                </div>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${isDark ? '#374151' : '#F3F4F6'}`, margin: 0 }} />

            {/* Bottom Section: Stats & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <EventStats registeredCount={event.registeredCount} viewsCount={event.viewsCount} />

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '8px 16px', borderRadius: '6px',
                        border: `1px solid ${border}`, backgroundColor: 'transparent',
                        color: textMain, fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        View Details
                    </button>
                    <button style={{
                        padding: '8px 16px', borderRadius: '6px',
                        border: `1px solid ${border}`, backgroundColor: 'transparent',
                        color: textMain, fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        Edit
                    </button>
                    <button style={{
                        padding: '8px 16px', borderRadius: '6px',
                        border: 'none', backgroundColor: 'transparent',
                        color: '#EF4444', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', opacity: 0.2 // Disabled look per design "Cancel" often greyed out
                    }} disabled>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventCard
