import React from 'react'
import { useNavigate } from 'react-router-dom'

const UpcomingInterviews: React.FC = () => {
    const navigate = useNavigate()
    const interviews = [
        { id: 1, name: 'James Wilson', role: 'Sr. Backend Dev', time: '10:00 AM', date: 'OCT 24', color: '#009ADD' },
        { id: 2, name: 'Priya Sharma', role: 'Product Designer', time: '2:30 PM', date: 'OCT 24', color: '#009ADD' },
    ]

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
            marginBottom: '24px'
        }}>
            <h3 style={{
                fontSize: '18px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626',
                marginBottom: '20px'
            }}>Upcoming Interviews</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {interviews.map((interview) => (
                    <div key={interview.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            padding: '8px 12px', borderRadius: '8px', backgroundColor: 'rgba(0, 154, 221, 0.1)',
                            minWidth: '50px'
                        }}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#005486', textTransform: 'uppercase' }}>OCT</span>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#009ADD' }}>24</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#262626' }}>{interview.name}</div>
                            <div style={{ fontSize: '12px', color: '#4B5563' }}>{interview.role}</div>
                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ClockIcon /> {interview.time}
                            </div>
                        </div>
                        {interview.name === 'James Wilson' ? (
                            <button
                                onClick={() => navigate(`/hr-dashboard/interviews/${interview.id}`)}
                                style={{
                                    backgroundColor: '#009ADD', color: '#FFFFFF', border: 'none', borderRadius: '6px',
                                    padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'
                                }}
                            >
                                Join
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate(`/hr-dashboard/interviews/${interview.id}`)}
                                style={{
                                    backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '6px',
                                    padding: '8px 16px', fontSize: '12px', color: '#374151', cursor: 'pointer', fontWeight: 500
                                }}
                            >
                                View
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)

export default UpcomingInterviews
