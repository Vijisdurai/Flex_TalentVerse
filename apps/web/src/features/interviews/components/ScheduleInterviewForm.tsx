import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScheduleInterview } from '../hooks/useScheduleInterview'
import { InterviewType } from '../types/interview.types'

const ScheduleInterviewForm: React.FC = () => {
    const navigate = useNavigate()
    const { schedule, isSubmitting } = useScheduleInterview()

    // Local state for form values
    const [formData, setFormData] = useState({
        candidateId: 'c-new',
        candidateName: '',
        jobId: 'j-1',
        date: '',
        startTime: '10:00',
        duration: 60,
        type: 'Video Call',
        platform: 'Google Meet',
        stage: 'Screening',
        interviewers: [] as string[],
        notes: ''
    })

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await schedule({
            ...formData,
            interviewers: ['u-1'], // Mock interviewer
            type: formData.type === 'Video Call' ? 'Technical' : 'Behavioral' // Mapping simple UI type to backend type for demo
        })

        if (success) {
            navigate('/hr-dashboard/interviews')
        }
    }

    // Styles
    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '16px', fontWeight: 'bold', color: '#009ADD',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
    }

    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px',
        fontFamily: 'Century Gothic, sans-serif'
    }

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5E7EB',
        fontFamily: 'Century Gothic, sans-serif', fontSize: '14px', boxSizing: 'border-box'
    }

    return (
        <form onSubmit={handleSubmit} style={{
            backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px',
            border: '1px solid #E5E7EB', maxWidth: '800px'
        }}>
            {/* Candidate Info */}
            <div style={{ marginBottom: '32px' }}>
                <h3 style={sectionTitleStyle}>👤 Candidate Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <label style={labelStyle}>Candidate</label>
                        <input
                            type="text"
                            placeholder="Search or select candidate"
                            style={inputStyle}
                            value={formData.candidateName}
                            onChange={e => handleChange('candidateName', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Job Application</label>
                        <select style={inputStyle} value={formData.jobId} onChange={e => handleChange('jobId', e.target.value)}>
                            <option value="j-1">Select job role...</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Frontend Dev">Frontend Developer</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Date & Time */}
            <div style={{ marginBottom: '32px' }}>
                <h3 style={sectionTitleStyle}>📅 Date & Time</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                    <div>
                        <label style={labelStyle}>Date</label>
                        <input
                            type="date"
                            style={inputStyle}
                            value={formData.date}
                            onChange={e => handleChange('date', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Start Time</label>
                        <input
                            type="time"
                            style={inputStyle}
                            value={formData.startTime}
                            onChange={e => handleChange('startTime', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Duration</label>
                        <select
                            style={inputStyle}
                            value={formData.duration}
                            onChange={e => handleChange('duration', Number(e.target.value))}
                        >
                            <option value={30}>30 min</option>
                            <option value={45}>45 min</option>
                            <option value={60}>60 min</option>
                            <option value={90}>90 min</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Interview Details */}
            <div style={{ marginBottom: '32px' }}>
                <h3 style={sectionTitleStyle}>📹 Interview Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <label style={labelStyle}>Interview Type</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {['Video Call', 'In-Person', 'Phone'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleChange('type', type)}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '8px',
                                        border: formData.type === type ? '1px solid #009ADD' : '1px solid #E5E7EB',
                                        backgroundColor: formData.type === type ? '#E0F2FE' : '#FFFFFF',
                                        color: formData.type === type ? '#009ADD' : '#6B7280',
                                        fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                                        fontFamily: 'Century Gothic, sans-serif'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Platform / Location</label>
                        <select style={inputStyle} value={formData.platform} onChange={e => handleChange('platform', e.target.value)}>
                            <option value="Google Meet">Google Meet</option>
                            <option value="Zoom">Zoom</option>
                            <option value="Teams">Teams</option>
                            <option value="Office">In-Person (Office)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <label style={labelStyle}>Interview Stage</label>
                        <select style={inputStyle} value={formData.stage} onChange={e => handleChange('stage', e.target.value)}>
                            <option value="Screening">Screening</option>
                            <option value="Technical">Technical Round</option>
                            <option value="Culture">Culture Fit</option>
                            <option value="Final">Final Round</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Interviewers</label>
                        <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '8px', color: '#9CA3AF' }}>
                            <span>Alex Johnson</span>
                            <small style={{ color: '#009ADD', cursor: 'pointer' }}>+ Add interviewers...</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Notes / Instructions</label>
                <textarea
                    rows={4}
                    placeholder="Add any specific instructions for the candidate or interviewers..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
                <button
                    type="button"
                    onClick={() => navigate('/hr-dashboard/interviews')}
                    style={{
                        padding: '10px 24px', borderRadius: '8px', border: '1px solid #E5E7EB',
                        backgroundColor: '#FFFFFF', color: '#374151', fontWeight: 600,
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '10px 24px', borderRadius: '8px', border: 'none',
                        backgroundColor: '#009ADD', color: '#FFFFFF', fontWeight: 600,
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1
                    }}
                >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
                </button>
            </div>

        </form>
    )
}

export default ScheduleInterviewForm
