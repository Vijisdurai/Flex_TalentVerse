import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobPostings } from '../hooks/useJobPostings'
import JobFilters from '../components/JobFilters'
import JobCard from '../components/JobCard'
// Importing from hr-dashboard as per user request to reuse existing sidebar without duplication
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'

const JobPostingsPage: React.FC = () => {
    const { jobs } = useJobPostings()
    const navigate = useNavigate()

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ padding: '32px', flex: 1, overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                            <div>
                                <h1 style={{
                                    fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626', margin: 0, marginBottom: '8px'
                                }}>
                                    Job Postings
                                </h1>
                                <p style={{
                                    fontSize: '14px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif', margin: 0
                                }}>
                                    Manage and track all active job openings
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/hr-dashboard/job-postings/create')}
                                style={{
                                    backgroundColor: '#009ADD',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Century Gothic, sans-serif',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <PlusIcon /> Create Job
                            </button>
                        </div>

                        {/* Filters */}
                        <JobFilters />

                        {/* Job List */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

export default JobPostingsPage
