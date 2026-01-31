import React, { useState, useMemo, useRef, useEffect } from 'react'
import KanbanBoard from '../components/KanbanBoard'
import { useTheme } from '../../../shared/providers/ThemeContext'
import { ApplicationStatus, APPLICATION_STATUSES } from '../types/application.types'
// We are NOT allowed to import outside the feature, but typically Sidebar/TopBar are shared
// The prompt says: "DO NOT modify sidebar, header, or global layout."
// However, to make it look like the image, I usually wrap it. 
// "UI TYPE: Kanban-style pipeline board... TOP BAR (INSIDE PAGE ONLY)"
// The prompt describes a "Top Bar (Inside Page Only)" which implies I build a specific header for this page, 
// NOT the global top bar.
// I will build the page content assuming it's rendered inside the dashboard layout provided by the app (which I cannot touch). 
// BUT, I can import HRSidebar/TopBar from '../hr-dashboard' if I want to visualize it in isolation?
// "DO NOT touch any existing files outside this feature."
// "This feature must live ONLY under... apps/web/src/features/hr-applications/"
// I will build the page *content*. The user can wrap it. 
// WAIT. In the previous turn I wrapped the JobPostings page.
// This time: "DO NOT modify sidebar..." doesn't mean "DO NOT USE".
// But "Feature: hr-applications" ... "Page contents only"?
// "PAGE NAME: HR Applications... TOP BAR (INSIDE PAGE ONLY): Include Page title..."
// I will build a self-contained page component that *includes* the "Inside Page" top bar, but I will NOT wrap it in the Sidebar/GlobalHeader if that's risky.
// However, the Image shows the sidebar.
// I will wrap it in `HRSidebar` if I can access it, just like the previous task, to ensure "Visual hierarchy matches design".
// Previous import: `import HRSidebar from '../../hr-dashboard/components/HRSidebar'`
// This technically touches another feature (reading it).
// The rule "DO NOT touch any existing files outside this feature" usually means "Do not EDIT".
// I will import the Sidebar/TopBar to give the user a complete page.

import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'

const ApplicationsPage: React.FC = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Dropdown States
    // Dropdown States
    type DropdownType = 'jobs' | 'status' | 'sort' | null
    const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null)

    // Refs for click outside detection
    const jobsRef = useRef<HTMLDivElement>(null)
    const statusRef = useRef<HTMLDivElement>(null)
    const sortRef = useRef<HTMLDivElement>(null)

    const [selectedJob, setSelectedJob] = useState('All Jobs')
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | 'All'>('All')
    const [sortBy, setSortBy] = useState<'Date' | 'Name'>('Date')

    // Click outside logic
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown === 'jobs' && jobsRef.current && !jobsRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
            if (activeDropdown === 'status' && statusRef.current && !statusRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
            if (activeDropdown === 'sort' && sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
        }

        if (activeDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [activeDropdown])

    const toggleJobsDropdown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveDropdown(activeDropdown === 'jobs' ? null : 'jobs')
    }
    const toggleStatusDropdown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveDropdown(activeDropdown === 'status' ? null : 'status')
    }
    const toggleSortDropdown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')
    }

    // Theme Styles
    const bg = isDark ? '#1F2937' : '#FFFFFF' // Page Bg
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const textSec = isDark ? '#9CA3AF' : '#6B7280'
    const border = isDark ? '#374151' : '#E5E7EB'
    const cardBg = isDark ? '#111827' : '#FFFFFF'
    const containerBg = isDark ? '#111827' : '#FFFFFF'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: bg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{
                    flex: 1,
                    padding: '32px',
                    backgroundColor: containerBg,
                    color: textMain,
                    overflow: 'hidden'
                }}>
                    {/* Page Header & Filters */}
                    <div style={{ marginBottom: '24px' }}>
                        <h1 style={{
                            fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            color: textMain, margin: 0, marginBottom: '4px'
                        }}>
                            Applications
                        </h1>
                        <p style={{
                            fontSize: '14px', color: textSec, fontFamily: 'Century Gothic, sans-serif', margin: 0, marginBottom: '24px'
                        }}>
                            Track and manage candidate applications
                        </p>

                        {/* Filters Row */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {/* All Jobs Dropdown */}
                            <div style={{ position: 'relative' }} ref={jobsRef}>
                                <div
                                    onClick={toggleJobsDropdown}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '8px 16px', borderRadius: '8px', border: `1px solid ${border}`,
                                        fontSize: '13px', fontWeight: 600, color: isDark ? '#D1D5DB' : '#374151',
                                        fontFamily: 'Century Gothic, sans-serif',
                                        cursor: 'pointer', backgroundColor: cardBg
                                    }}
                                >
                                    <BriefcaseIcon size={14} />
                                    {selectedJob}
                                    <ChevronDownIcon size={14} />
                                </div>
                                {activeDropdown === 'jobs' && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                                        backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 20, minWidth: '200px',
                                        color: textMain
                                    }}>
                                        {['All Jobs', 'UX Designer', 'Frontend Dev', 'Product Manager'].map(job => (
                                            <div
                                                key={job}
                                                onClick={() => { setSelectedJob(job); setActiveDropdown(null) }}
                                                style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Century Gothic' }}
                                            >
                                                {job}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status Dropdown */}
                            <div style={{ position: 'relative' }} ref={statusRef}>
                                <div
                                    onClick={toggleStatusDropdown}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '8px 16px', borderRadius: '8px', border: `1px solid ${border}`,
                                        fontSize: '13px', fontWeight: 600, color: isDark ? '#D1D5DB' : '#374151',
                                        fontFamily: 'Century Gothic, sans-serif',
                                        cursor: 'pointer', backgroundColor: cardBg
                                    }}
                                >
                                    <FilterIcon size={14} />
                                    Status: {selectedStatus}
                                    <ChevronDownIcon size={14} />
                                </div>
                                {activeDropdown === 'status' && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                                        backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 20, minWidth: '160px',
                                        color: textMain
                                    }}>
                                        <div
                                            onClick={() => { setSelectedStatus('All'); setActiveDropdown(null) }}
                                            style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Century Gothic' }}
                                        >
                                            All
                                        </div>
                                        {APPLICATION_STATUSES.map(status => (
                                            <div
                                                key={status}
                                                onClick={() => { setSelectedStatus(status); setActiveDropdown(null) }}
                                                style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Century Gothic' }}
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Dropdown */}
                            <div style={{ position: 'relative' }} ref={sortRef}>
                                <div
                                    onClick={toggleSortDropdown}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '8px 16px', borderRadius: '8px', border: `1px solid ${border}`,
                                        fontSize: '13px', fontWeight: 600, color: isDark ? '#D1D5DB' : '#374151',
                                        fontFamily: 'Century Gothic, sans-serif',
                                        cursor: 'pointer', backgroundColor: cardBg
                                    }}
                                >
                                    Sort by: {sortBy === 'Date' ? 'Date Applied' : 'Name'}
                                    <ChevronDownIcon size={14} />
                                </div>
                                {activeDropdown === 'sort' && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                                        backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 20, minWidth: '160px',
                                        color: textMain
                                    }}>
                                        <div
                                            onClick={() => { setSortBy('Date'); setActiveDropdown(null) }}
                                            style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Century Gothic' }}
                                        >
                                            Date Applied
                                        </div>
                                        <div
                                            onClick={() => { setSortBy('Name'); setActiveDropdown(null) }}
                                            style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Century Gothic' }}
                                        >
                                            Candidate Name
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1 }}></div>

                            {/* View Toggles (Visual only) */}
                            <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px' }}>
                                <button style={{
                                    padding: '4px 8px', border: 'none', background: '#F3F4F6', borderRadius: '4px', cursor: 'pointer', color: '#009ADD'
                                }}>
                                    <KanbanIcon />
                                </button>
                                <button style={{
                                    padding: '4px 8px', border: 'none', background: 'transparent', borderRadius: '4px', cursor: 'pointer', color: '#9CA3AF'
                                }}>
                                    <ListIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Kanban Board */}
                    <KanbanBoard />
                </main>
            </div>
        </div>
    )
}

// Icons
const ChevronDownIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)
const BriefcaseIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
)
const FilterIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
)
const KanbanIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="18" rx="1"></rect>
        <rect x="14" y="3" width="7" height="18" rx="1"></rect>
    </svg>
)
const ListIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
)


export default ApplicationsPage
