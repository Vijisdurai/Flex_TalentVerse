import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import { useInterviews } from '../hooks/useInterviews'

// Components
import InterviewFilters from '../components/InterviewFilters'
import LiveNowCard from '../components/LiveNowCard'
import InterviewCard from '../components/InterviewCard'

const InterviewsPage: React.FC = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { liveInterview, todayInterviews, tomorrowInterviews, isLoading } = useInterviews()
    const isDark = theme === 'dark'

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const sectionTitleColor = isDark ? '#D1D5DB' : '#374151'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h1 style={{
                                fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                                color: textMain, margin: '0 0 4px 0'
                            }}>
                                Interviews
                            </h1>
                            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif' }}>
                                Schedule and manage interviews
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/hr-dashboard/interviews/schedule')}
                            style={{
                                padding: '10px 20px', borderRadius: '8px', border: 'none',
                                backgroundColor: '#009ADD', color: '#FFFFFF', fontWeight: 600,
                                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            + Schedule Interview
                        </button>
                    </div>

                    {/* Filters */}
                    <div style={{ marginBottom: '32px' }}>
                        <InterviewFilters />
                    </div>

                    {isLoading ? (
                        <div style={{ color: textMain }}>Loading interviews...</div>
                    ) : (
                        <>
                            {/* Live Now */}
                            {liveInterview && (
                                <div style={{ marginBottom: '40px' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
                                        color: '#EF4444', fontWeight: 'bold', fontSize: '14px', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                                    }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                                        Live Now
                                    </div>
                                    <LiveNowCard interview={liveInterview} />
                                </div>
                            )}

                            {/* Today */}
                            {todayInterviews.length > 0 && (
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                        fontSize: '16px', fontWeight: 600, color: sectionTitleColor, marginBottom: '16px',
                                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                                    }}>
                                        Today, Oct 24
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                                        {todayInterviews.map(i => (
                                            <InterviewCard key={i.id} interview={i} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tomorrow */}
                            {tomorrowInterviews.length > 0 && (
                                <div>
                                    <h3 style={{
                                        fontSize: '16px', fontWeight: 600, color: sectionTitleColor, marginBottom: '16px',
                                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                                    }}>
                                        Tomorrow, Oct 25
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                                        {tomorrowInterviews.map(i => (
                                            <InterviewCard key={i.id} interview={i} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State */}
                            {!liveInterview && !todayInterviews.length && !tomorrowInterviews.length && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                                    No interviews scheduled found.
                                </div>
                            )}
                        </>
                    )}

                </main>
            </div>
        </div>
    )
}

export default InterviewsPage
