import React from 'react'
import { useNavigate } from 'react-router-dom'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import JobForm from '../components/JobForm'

const CreateJobPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ padding: '32px', flex: 1, overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                        {/* Back Link */}
                        <div
                            onClick={() => navigate('/hr-dashboard/job-postings')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px',
                                color: '#6B7280', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                                cursor: 'pointer', fontWeight: 500
                            }}
                        >
                            <ArrowLeftIcon />
                            Back to Job Postings
                        </div>

                        <h1 style={{
                            fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            color: '#262626', margin: 0, marginBottom: '32px'
                        }}>
                            Create New Job
                        </h1>

                        <JobForm />
                    </div>
                </main>
            </div>
        </div>
    )
}

const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
)

export default CreateJobPage
