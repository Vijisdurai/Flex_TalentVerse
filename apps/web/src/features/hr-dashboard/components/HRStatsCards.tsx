import React from 'react'

const HRStatsCards: React.FC = () => {
    const stats = [
        {
            label: 'Total Applications',
            value: '1,248',
            icon: <FileIcon />,
            color: '#009ADD',
            bg: 'rgba(0, 154, 221, 0.1)'
        },
        {
            label: 'Shortlisted Candidates',
            value: '86',
            icon: <CheckIcon />,
            color: '#82BC00', // Green
            bg: 'rgba(130, 188, 0, 0.1)',
            badge: '+5%'
        },
        {
            label: 'Interviews Scheduled',
            value: '4',
            icon: <VideoIcon />,
            color: '#F1B52C', // Gold
            bg: 'rgba(241, 181, 44, 0.1)'
        },
        {
            label: 'Offers Sent',
            value: '12',
            icon: <MailIcon />,
            color: '#BA257D', // Fuchsia
            bg: 'rgba(186, 37, 125, 0.1)'
        }
    ]

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '32px'
        }}>
            {stats.map((stat, index) => (
                <div key={index} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '140px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '12px',
                            backgroundColor: stat.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: stat.color
                        }}>
                            {stat.icon}
                        </div>
                        {stat.label === 'Shortlisted Candidates' && (
                            <span style={{
                                backgroundColor: 'rgba(130, 188, 0, 0.1)', color: '#82BC00',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                            }}>+5%</span>
                        )}
                        {stat.label === 'Interviews Scheduled' && (
                            <span style={{
                                backgroundColor: 'rgba(241, 181, 44, 0.1)', color: '#CE6D28',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                            }}>Today</span>
                        )}
                    </div>
                    <div>
                        <div style={{
                            fontSize: '32px', fontWeight: 'bold', color: '#262626',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            lineHeight: '1'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{
                            fontSize: '14px', color: '#6B7280', marginTop: '4px',
                            fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            {stat.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const FileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
)

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const VideoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
)

const MailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)

export default HRStatsCards
