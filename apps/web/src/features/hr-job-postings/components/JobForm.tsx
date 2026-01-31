import React from 'react'
import { useCreateJobForm } from '../hooks/useCreateJobForm'
import SalaryRangeInput from './SalaryRangeInput'
import JobFormActions from './JobFormActions'
import { useNavigate } from 'react-router-dom'

const JobForm: React.FC = () => {
    const { formState, handleChange, handleSalaryChange } = useCreateJobForm()
    const navigate = useNavigate()

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '32px',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
            maxWidth: '1000px'
        }}>
            <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
                {/* Job Title */}
                <div style={{ flex: 1 }}>
                    <label style={{
                        display: 'block', marginBottom: '8px',
                        fontSize: '14px', fontWeight: 600, color: '#262626',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        Job Title <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formState.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        style={{
                            width: '100%', height: '48px', padding: '0 16px', borderRadius: '8px',
                            border: '1px solid #E5E7EB', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626', outline: 'none'
                        }}
                    />
                </div>

                {/* Employment Type */}
                <div style={{ flex: 1 }}>
                    <label style={{
                        display: 'block', marginBottom: '8px',
                        fontSize: '14px', fontWeight: 600, color: '#262626',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        Employment Type <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={formState.employmentType}
                            onChange={(e) => handleChange('employmentType', e.target.value as any)}
                            style={{
                                width: '100%', height: '48px', padding: '0 16px', borderRadius: '8px',
                                border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                                fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                                color: formState.employmentType ? '#262626' : '#9CA3AF',
                                outline: 'none', appearance: 'none', cursor: 'pointer'
                            }}
                        >
                            <option value="" disabled>Select type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                            <ChevronDownIcon />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
                {/* Location Type */}
                <div style={{ flex: 1 }}>
                    <label style={{
                        display: 'block', marginBottom: '8px',
                        fontSize: '14px', fontWeight: 600, color: '#262626',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        Location Type
                    </label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={formState.locationType}
                            onChange={(e) => handleChange('locationType', e.target.value as any)}
                            style={{
                                width: '100%', height: '48px', padding: '0 16px', borderRadius: '8px',
                                border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                                fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                                color: '#262626', outline: 'none', appearance: 'none', cursor: 'pointer'
                            }}
                        >
                            <option value="Remote">Remote</option>
                            <option value="Onsite">Onsite</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                            <ChevronDownIcon />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div style={{ flex: 1 }}>
                    <label style={{
                        display: 'block', marginBottom: '8px',
                        fontSize: '14px', fontWeight: 600, color: '#262626',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        Location <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formState.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        style={{
                            width: '100%', height: '48px', padding: '0 16px', borderRadius: '8px',
                            border: '1px solid #E5E7EB', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Job Description */}
            <div style={{ marginBottom: '24px' }}>
                <label style={{
                    display: 'block', marginBottom: '8px',
                    fontSize: '14px', fontWeight: 600, color: '#262626',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Job Description <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                    value={formState.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe the role, responsibilities, and team culture..."
                    style={{
                        width: '100%', height: '160px', padding: '16px', borderRadius: '8px',
                        border: '1px solid #E5E7EB', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                        color: '#262626', outline: 'none', resize: 'vertical'
                    }}
                />
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px', textAlign: 'right', fontFamily: 'Century Gothic' }}>
                    Markdown formatting is supported.
                </div>
            </div>

            {/* Requirements */}
            <div>
                <label style={{
                    display: 'block', marginBottom: '8px',
                    fontSize: '14px', fontWeight: 600, color: '#262626',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Requirements <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                    value={formState.requirements}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                    placeholder="- List requirements here..."
                    style={{
                        width: '100%', height: '160px', padding: '16px', borderRadius: '8px',
                        border: '1px solid #E5E7EB', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                        color: '#262626', outline: 'none', resize: 'vertical'
                    }}
                />
            </div>

            <SalaryRangeInput
                min={formState.salaryMin}
                max={formState.salaryMax}
                currency={formState.currency}
                onMinChange={(val) => handleSalaryChange('min', val)}
                onMaxChange={(val) => handleSalaryChange('max', val)}
                onCurrencyChange={(val) => handleChange('currency', val as any)}
            />

            <JobFormActions
                onCancel={() => navigate('/hr-dashboard/job-postings')}
                onSaveDraft={() => console.log('Save Draft', formState)}
                onPublish={() => console.log('Publish', formState)}
            />
        </div>
    )
}

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)

export default JobForm
