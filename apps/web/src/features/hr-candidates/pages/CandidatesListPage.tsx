import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import { CandidateStatus } from '../types/candidate.types'

// Mock Data for List
const MOCK_CANDIDATES = [
    { id: 'c-1', name: 'Alex Morgan', role: 'Senior UX Designer', status: 'Interview', date: 'May 10, 2026' },
    { id: 'c-2', name: 'James Wilson', role: 'Senior Backend Dev', status: 'In Review', date: 'May 12, 2026' },
    { id: 'c-3', name: 'Sarah Chen', role: 'Product Manager', status: 'Applied', date: 'May 14, 2026' },
    { id: 'c-4', name: 'Michael Ross', role: 'Data Scientist', status: 'Shortlisted', date: 'May 08, 2026' },
    { id: 'c-5', name: 'Elena Rodriguez', role: 'Marketing Lead', status: 'Rejected', date: 'May 01, 2026' },
]

const CandidatesListPage: React.FC = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [searchTerm, setSearchTerm] = useState('')

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const cardBg = isDark ? '#374151' : '#FFFFFF'
    const border = isDark ? '#4B5563' : '#E5E7EB'

    const filteredCandidates = MOCK_CANDIDATES.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Interview': return { bg: '#E0F2FE', color: '#009ADD' }
            case 'Shortlisted': return { bg: '#FDF4FF', color: '#BA257D' }
            case 'In Review': return { bg: '#FFF7ED', color: '#F59E0B' }
            case 'Rejected': return { bg: '#FEF2F2', color: '#EF4444' }
            default: return { bg: '#F3F4F6', color: '#6B7280' }
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ flex: 1, padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h1 style={{
                            fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            color: textMain, margin: 0
                        }}>
                            Candidates
                        </h1>
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '10px 16px', borderRadius: '8px', border: `1px solid ${border}`,
                                backgroundColor: cardBg, color: textMain, width: '300px',
                                fontFamily: 'Century Gothic, sans-serif'
                            }}
                        />
                    </div>

                    {/* Table / List */}
                    <div style={{
                        backgroundColor: cardBg, borderRadius: '12px', border: `1px solid ${border}`, overflow: 'hidden'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${border}`, backgroundColor: isDark ? '#111827' : '#F9FAFB' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>NAME</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>ROLE</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>STATUS</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>APPLIED DATE</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCandidates.map(candidate => {
                                    const badge = getStatusStyle(candidate.status)
                                    return (
                                        <tr key={candidate.id} style={{ borderBottom: `1px solid ${border}` }}>
                                            <td style={{ padding: '16px', fontWeight: 600, color: textMain, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>
                                                {candidate.name}
                                            </td>
                                            <td style={{ padding: '16px', color: isDark ? '#D1D5DB' : '#4B5563', fontFamily: 'Century Gothic, sans-serif' }}>
                                                {candidate.role}
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    backgroundColor: badge.bg, color: badge.color,
                                                    padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600,
                                                    fontFamily: 'Century Gothic, sans-serif'
                                                }}>
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', color: isDark ? '#9CA3AF' : '#6B7280', fontFamily: 'Century Gothic, sans-serif' }}>
                                                {candidate.date}
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <button
                                                    onClick={() => navigate(`/hr-dashboard/applications/${candidate.id}`)}
                                                    style={{
                                                        padding: '6px 12px', borderRadius: '6px', border: `1px solid ${border}`,
                                                        backgroundColor: 'transparent', color: '#009ADD',
                                                        fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                                                        fontFamily: 'Century Gothic, sans-serif'
                                                    }}
                                                >
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CandidatesListPage
