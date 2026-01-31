import React from 'react'
import { JobStats as StatsType } from '../types/jobPosting.types'

interface JobStatsProps {
    stats: StatsType
}

const JobStats: React.FC<JobStatsProps> = ({ stats }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Applications */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', borderRadius: '8px',
                    backgroundColor: 'rgba(0, 154, 221, 0.1)', color: '#009ADD'
                }}>
                    <UsersIcon />
                </div>
                <div>
                    <div style={{
                        fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626', lineHeight: 1
                    }}>
                        {stats.applications}
                    </div>
                    <div style={{
                        fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        Applications
                    </div>
                </div>
            </div>

            {/* Views */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', borderRadius: '8px',
                    backgroundColor: '#F2F2F2', color: '#6B7280'
                }}>
                    <EyeIcon />
                </div>
                <div>
                    <div style={{
                        fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626', lineHeight: 1
                    }}>
                        {stats.views}
                    </div>
                    <div style={{
                        fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        Views
                    </div>
                </div>
            </div>
        </div>
    )
}

const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
)

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
)

export default JobStats
