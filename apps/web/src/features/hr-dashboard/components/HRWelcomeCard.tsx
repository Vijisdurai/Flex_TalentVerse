import React from 'react'

const HRWelcomeCard: React.FC = () => {
    return (
        <div style={{
            background: 'linear-gradient(90deg, #009ADD 0%, #005486 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: '#FFFFFF',
            marginBottom: '24px',
            boxShadow: '0px 4px 12px rgba(0, 84, 134, 0.2)'
        }}>
            <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                Welcome back, Sarah! <span style={{ fontSize: '28px' }}>👋</span>
            </h2>
            <p style={{
                fontSize: '16px',
                opacity: 0.9,
                fontFamily: 'Century Gothic, sans-serif',
                marginBottom: '24px'
            }}>
                Here's what's happening in your hiring pipeline today.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)'
                }}>
                    <span>🚀</span> 3 Active Jobs
                </div>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)'
                }}>
                    <span>📂</span> 12 New Applications
                </div>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)'
                }}>
                    <span>📅</span> 4 Interviews Scheduled
                </div>
            </div>
        </div>
    )
}

export default HRWelcomeCard
