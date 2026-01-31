import React from 'react'

const NotificationsPanel: React.FC = () => {
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                    fontSize: '18px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                }}>Notifications</h3>
                <span style={{
                    backgroundColor: '#009ADD', color: '#FFFFFF', borderRadius: '50%', width: '20px', height: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold'
                }}>3</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Notification 1 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009ADD', marginTop: '6px', flexShrink: 0 }}></div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#262626' }}>New Application Received</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: '1.4' }}>
                            Michael Chang applied for Senior React Developer position.
                        </div>
                    </div>
                </div>

                {/* Notification 2 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009ADD', marginTop: '6px', flexShrink: 0 }}></div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#262626' }}>Candidate Shortlisted</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: '1.4' }}>
                            Review feedback for Sarah Jenkins before the next round.
                        </div>
                    </div>
                </div>

                {/* Notification 3 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '6px', flexShrink: 0 }}></div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4B5563' }}>Interview Reminder</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: '1.4' }}>
                            Interview with James Wilson starts in 15 minutes.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationsPanel
