import React from 'react'
import { CandidateProfile, CandidateStatus } from '../types/candidate.types'
import ActionButtons from './ActionButtons'

interface CandidateHeaderProps {
    candidate: CandidateProfile
    onUpdateStatus: (s: CandidateStatus) => void
    onUndoReject: () => void
    onSchedule: () => void
}

const CandidateHeader: React.FC<CandidateHeaderProps> = ({ candidate, onUpdateStatus, onUndoReject, onSchedule }) => {

    // Status Badge Color
    const getBadgeStyle = (status: CandidateStatus) => {
        switch (status) {
            case 'Interview': return { bg: '#E0F2FE', color: '#009ADD' } // Light Blue
            case 'Shortlisted': return { bg: '#FDF4FF', color: '#BA257D' } // Light Fuchsia
            case 'Selected': return { bg: '#F0FDF4', color: '#82BC00' } // Light Green
            case 'Rejected': return { bg: '#FEF2F2', color: '#EF4444' } // Light Red
            default: return { bg: '#F3F4F6', color: '#6B7280' }
        }
    }

    const badgeStyle = getBadgeStyle(candidate.status)

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                {/* Avatar */}
                <img
                    src={candidate.avatarUrl}
                    alt={candidate.name}
                    style={{
                        width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover'
                    }}
                />

                {/* Info */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <h1 style={{
                            margin: 0, fontSize: '24px', fontWeight: 'bold',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                        }}>
                            {candidate.name}
                        </h1>
                        <span style={{
                            backgroundColor: badgeStyle.bg, color: badgeStyle.color,
                            padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600,
                            fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            {candidate.status === 'Interview' ? 'Interview Stage' : candidate.status}
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', color: '#6B7280', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <BriefcaseIcon size={14} />
                            {candidate.role}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPinIcon size={14} />
                            {candidate.location} {candidate.isRemote && '(Remote)'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ClockIcon size={14} />
                            {candidate.experienceYears}+ Years Exp.
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <ActionButtons
                status={candidate.status}
                onUpdateStatus={onUpdateStatus}
                onUndoReject={onUndoReject}
                onSchedule={onSchedule}
            />
        </div>
    )
}

// Icons
const BriefcaseIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
)

const MapPinIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
)

const ClockIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
)

export default CandidateHeader
