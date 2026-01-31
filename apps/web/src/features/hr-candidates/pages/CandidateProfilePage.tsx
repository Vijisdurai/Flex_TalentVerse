import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import { useCandidateProfile } from '../hooks/useCandidateProfile'
import { CandidateStatus } from '../types/candidate.types'

// Components
import CandidateHeader from '../components/CandidateHeader'
import SkillsTags from '../components/SkillsTags'
import ExperienceTimeline from '../components/ExperienceTimeline'
import EducationSection from '../components/EducationSection'
import ResumeCard from '../components/ResumeCard'
import ApplicationTimeline from '../components/ApplicationTimeline'
import NotesPanel from '../components/NotesPanel'
import ScheduleInterviewModal from '../components/ScheduleInterviewModal'

const CandidateProfilePage: React.FC = () => {
    const { candidateId } = useParams<{ candidateId: string }>()
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Hooks
    const { candidate, updateStatus, undoReject, saveNote, downloadResume } = useCandidateProfile(candidateId || '1')

    // Local UI State
    const [isInterviewModalOpen, setInterviewModalOpen] = useState(false)

    // Handlers
    const handleScheduleClick = () => setInterviewModalOpen(true)
    const handleModalClose = () => setInterviewModalOpen(false)
    const handleModalConfirm = () => {
        updateStatus('Interview')
        setInterviewModalOpen(false)
        alert('Interview Scheduled!')
    }

    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }

    // Confirmation wrapper for updates
    const handleUpdateStatus = (status: CandidateStatus) => {
        if (status === 'Rejected') {
            const confirmed = window.confirm(`Are you sure you want to reject ${candidate.name}?`)
            if (!confirmed) return
        }
        updateStatus(status)
    }

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

                    {/* Breadcrumb / Back */}
                    <button
                        onClick={handleBack}
                        style={{
                            border: 'none', background: 'none', padding: 0, marginBottom: '16px',
                            color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                            fontSize: '14px', fontFamily: 'Century Gothic, sans-serif'
                        }}
                    >
                        ← Back to Candidates
                    </button>

                    {/* Page Title */}
                    <h1 style={{
                        fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: textMain, margin: '0 0 24px 0'
                    }}>
                        Candidate Profile
                    </h1>

                    {/* Header Card */}
                    <CandidateHeader
                        candidate={candidate}
                        onUpdateStatus={handleUpdateStatus}
                        onUndoReject={undoReject}
                        onSchedule={handleScheduleClick}
                    />

                    {/* Content Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>

                        {/* Left Column */}
                        <div style={{
                            backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px',
                            border: '1px solid #F3F4F6'
                        }}>
                            {/* About */}
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{
                                    fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                                    color: '#262626', marginBottom: '12px'
                                }}>
                                    About Candidate
                                </h3>
                                <p style={{
                                    fontSize: '14px', lineHeight: '1.6', color: '#4B5563', fontFamily: 'Century Gothic, sans-serif', margin: 0
                                }}>
                                    {candidate.about}
                                </p>
                            </div>

                            {/* Skills */}
                            <SkillsTags skills={candidate.items} />

                            {/* Experience */}
                            <ExperienceTimeline exercises={candidate.experience} />

                            {/* Education */}
                            <EducationSection educationValues={candidate.education} />
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Resume */}
                            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid #F3F4F6' }}>
                                <ResumeCard fileName={candidate.resumeName} onDownload={downloadResume} />
                            </div>

                            {/* Timeline */}
                            <ApplicationTimeline timeline={candidate.applicationTimeline} />

                            {/* Notes */}
                            <NotesPanel notes={candidate.notes} onSave={saveNote} />
                        </div>
                    </div>

                </main>
            </div>

            {/* Modals */}
            <ScheduleInterviewModal
                isOpen={isInterviewModalOpen}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />
        </div>
    )
}

export default CandidateProfilePage
