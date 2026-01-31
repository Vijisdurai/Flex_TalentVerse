import React from 'react'
import { useNavigate } from 'react-router-dom'
import { JobPosting, JobStatus } from '../types/jobPosting.types'
import JobStats from './JobStats'

interface JobCardProps {
    job: JobPosting
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const navigate = useNavigate()

    // STRICT COLOR RULE: Active = Green #82BC00
    const getStatusStyles = (status: JobStatus) => {
        switch (status) {
            case 'Active':
                return { bg: 'rgba(130, 188, 0, 0.1)', color: '#82BC00' } // Green
            case 'Closed':
                return { bg: '#F2F2F2', color: '#6B7280' } // Grey
            case 'Draft':
                return { bg: 'rgba(241, 181, 44, 0.1)', color: '#F1B52C' } // Gold
            default:
                return { bg: '#F2F2F2', color: '#6B7280' }
        }
    }

    const s = getStatusStyles(job.status)

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <h3 style={{
                        margin: 0, fontSize: '18px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                    }}>
                        {job.title}
                    </h3>
                    <span style={{
                        backgroundColor: s.bg,
                        color: s.color,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        {job.status}
                    </span>
                </div>

                {/* Options Menu Icon */}
                <div style={{ color: '#9CA3AF', cursor: 'pointer' }}>
                    <MoreHorizontalIcon />
                </div>
            </div>

            <div style={{
                marginTop: '8px',
                display: 'flex', gap: '16px',
                color: '#6B7280', fontSize: '13px', fontFamily: 'Century Gothic, sans-serif'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BriefcaseIcon /> {job.type}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPinIcon /> {job.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ClockIcon /> {job.postedAt}
                </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <JobStats stats={job.stats} />

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => navigate(`/hr-dashboard/job-postings/${job.id}`)}
                        style={{
                            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#374151',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                        }}
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => navigate(`/hr-dashboard/job-postings/${job.id}/edit`)}
                        style={{
                            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#374151',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                        }}
                    >
                        Edit
                    </button>

                    {/* Dynamic Status Action Button */}
                    {job.status === 'Active' && (
                        <button style={{
                            backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#EF4444',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            Close
                        </button>
                    )}
                    {job.status === 'Closed' && (
                        <button style={{
                            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#374151',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            Repost
                        </button>
                    )}
                    {job.status === 'Draft' && (
                        <button style={{
                            backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#EF4444',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif'
                        }}>
                            Delete
                        </button>
                    )}
                    {job.status === 'Draft' && (
                        // If it's draft, we also usually see 'Publish', design shows it for Data Analyst
                        <button style={{
                            backgroundColor: '#FFFFFF', border: '1px solid #009ADD', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#009ADD',
                            cursor: 'pointer', fontFamily: 'Century Gothic, sans-serif', marginLeft: '0px'
                        }}>
                            Publish Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

const MoreHorizontalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
)

const BriefcaseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
)

const MapPinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
)

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
)

export default JobCard
