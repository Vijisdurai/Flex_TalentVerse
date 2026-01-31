import React from 'react'
import { CandidateStatus } from '../types/candidate.types'

interface ActionButtonsProps {
    status: CandidateStatus
    onUpdateStatus: (s: CandidateStatus) => void
    onUndoReject: () => void
    onSchedule: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onUpdateStatus, onUndoReject, onSchedule }) => {

    // Status Logic
    const isRejected = status === 'Rejected'
    const isShortlisted = status === 'Shortlisted' || status === 'Interview' || status === 'Selected'

    return (
        <div style={{ display: 'flex', gap: '12px' }}>
            {/* Undo Rejection Button - Only visible when Rejected */}
            {isRejected && (
                <button
                    onClick={onUndoReject}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#FFFFFF',
                        color: '#6B7280',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <UndoIcon size={16} /> Undo Rejection
                </button>
            )}

            {/* Reject Button */}
            {!isRejected && (
                <button
                    onClick={() => onUpdateStatus('Rejected')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #FEF2F2',
                        backgroundColor: '#FEF2F2',
                        color: '#EF4444',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <CloseIcon size={16} /> Reject
                </button>
            )}

            {/* Shortlist Button */}
            {!isShortlisted && !isRejected && (
                <button
                    onClick={() => onUpdateStatus('Shortlisted')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#FFFFFF',
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <CheckIcon size={16} /> Shortlist
                </button>
            )}

            {/* Schedule Interview Button */}
            <button
                onClick={onSchedule}
                style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#009ADD',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '8px'
                }}
            >
                <CalendarIcon size={16} /> Schedule Interview
            </button>
        </div>
    )
}

// Icons
const CloseIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

const CheckIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

const CalendarIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
)

const UndoIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
    </svg>
)

export default ActionButtons
