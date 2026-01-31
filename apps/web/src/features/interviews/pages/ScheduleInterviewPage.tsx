import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import ScheduleInterviewForm from '../components/ScheduleInterviewForm'

const ScheduleInterviewPage: React.FC = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {/* Back */}
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            border: 'none', background: 'none', padding: 0, marginBottom: '24px',
                            color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                            fontSize: '14px', fontFamily: 'Century Gothic, sans-serif'
                        }}
                    >
                        ← Back to Interviews
                    </button>

                    <h1 style={{
                        fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: textMain, margin: '0 0 4px 0'
                    }}>
                        Schedule Interview
                    </h1>
                    <p style={{ margin: '0 0 32px 0', color: '#6B7280', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif' }}>
                        Set up a new interview with a candidate
                    </p>

                    <ScheduleInterviewForm />

                </main>
            </div>
        </div>
    )
}

export default ScheduleInterviewPage
