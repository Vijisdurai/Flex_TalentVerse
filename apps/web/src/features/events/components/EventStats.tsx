import React from 'react'

interface EventStatsProps {
    registeredCount: number
    viewsCount: number
}

const EventStats: React.FC<EventStatsProps> = ({ registeredCount, viewsCount }) => {
    return (
        <div style={{ display: 'flex', gap: '24px' }}>
            {/* Registered Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    backgroundColor: '#E0F2FE', color: '#009ADD',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px'
                }}>
                    👥
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#262626', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>
                        {registeredCount}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>
                        Registered
                    </span>
                </div>
            </div>

            {/* Views Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    backgroundColor: '#F3F4F6', color: '#4B5563',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px'
                }}>
                    👁️
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#262626', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>
                        {viewsCount > 1000 ? (viewsCount / 1000).toFixed(1) + 'k' : viewsCount}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>
                        Views
                    </span>
                </div>
            </div>
        </div>
    )
}

export default EventStats
