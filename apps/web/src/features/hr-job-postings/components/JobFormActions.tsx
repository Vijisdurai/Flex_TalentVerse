import React from 'react'

interface JobFormActionsProps {
    onCancel: () => void
    onSaveDraft: () => void
    onPublish: () => void
}

const JobFormActions: React.FC<JobFormActionsProps> = ({ onCancel, onSaveDraft, onPublish }) => {
    return (
        <div style={{
            display: 'flex', gap: '16px', marginTop: '40px', paddingTop: '24px',
            borderTop: '1px solid #F2F2F2'
        }}>
            <button
                onClick={onCancel}
                style={{
                    padding: '12px 24px', borderRadius: '8px', border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF', color: '#374151',
                    fontSize: '14px', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif',
                    cursor: 'pointer'
                }}
            >
                Cancel
            </button>
            <button
                onClick={onSaveDraft}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', borderRadius: '8px', border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF', color: '#374151',
                    fontSize: '14px', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif',
                    cursor: 'pointer'
                }}
            >
                <SaveIcon />
                Save Draft
            </button>
            <button
                onClick={onPublish}
                style={{
                    padding: '12px 24px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#009ADD', color: '#FFFFFF',
                    fontSize: '14px', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif',
                    cursor: 'pointer'
                }}
            >
                Publish Job
            </button>
        </div>
    )
}

const SaveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
)

export default JobFormActions
