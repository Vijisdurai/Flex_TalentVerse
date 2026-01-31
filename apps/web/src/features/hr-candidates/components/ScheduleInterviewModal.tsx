import React from 'react'

interface ScheduleInterviewModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', width: '400px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    margin: '0 0 16px', fontSize: '20px', fontWeight: 'bold',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                }}>
                    Schedule Interview
                </h2>
                <p style={{
                    fontSize: '14px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif', marginBottom: '24px'
                }}>
                    Select a time for the interview with the candidate.
                </p>

                {/* Mock Form Inputs */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#374151', fontFamily: 'Century Gothic' }}>Date</label>
                    <input type="date" style={{ width: '100%', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '6px' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: '#374151', fontFamily: 'Century Gothic' }}>Time</label>
                    <input type="time" style={{ width: '100%', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '6px' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
                            color: '#374151', fontWeight: 600, cursor: 'pointer', fontFamily: 'Century Gothic'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px', backgroundColor: '#009ADD', border: 'none', borderRadius: '8px',
                            color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', fontFamily: 'Century Gothic'
                        }}
                    >
                        Confirm Schedule
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleInterviewModal
