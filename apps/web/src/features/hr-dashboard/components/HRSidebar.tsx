import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const HRSidebar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { name: 'Dashboard', path: '/hr-dashboard', icon: <DashboardIcon /> },
        { name: 'Job Postings', path: '/hr-dashboard/job-postings', icon: <JobIcon /> },
        { name: 'Applications', path: '/hr-dashboard/applications', icon: <ApplicationsIcon /> },
        { name: 'Candidates', path: '/hr-dashboard/candidates', icon: <CandidatesIcon /> },
        { name: 'Interviews', path: '/hr-dashboard/interviews', icon: <InterviewsIcon /> },
        { name: 'Events', path: '/hr-dashboard/events', icon: <EventsIcon /> },
        { name: 'Notifications', path: '/hr-dashboard/notifications', icon: <NotificationsIcon /> },
    ]

    const isActive = (path: string) => {
        if (path === '/hr-dashboard' && location.pathname === '/hr-dashboard') return true
        if (path !== '/hr-dashboard' && location.pathname.startsWith(path)) return true
        return false
    }

    return (
        <aside style={{
            width: '260px',
            backgroundColor: '#005486',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0,
            flexShrink: 0
        }}>
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px', height: '32px', background: '#FFFFFF', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#009ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="#009ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#009ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>FlexTalent</span>
            </div>

            <nav style={{ flex: 1, padding: '24px 16px' }}>
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            marginBottom: '4px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            color: '#FFFFFF',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}
            </nav>

            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div
                    onClick={() => navigate('/hr-dashboard/settings')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0',
                        color: '#FFFFFF', fontSize: '14px', cursor: 'pointer', opacity: 0.8
                    }}
                >
                    <SettingsIcon />
                    <span>Settings</span>
                </div>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0',
                        color: '#FFFFFF', fontSize: '14px', cursor: 'pointer', opacity: 0.8
                    }}
                >
                    <LogoutIcon />
                    <span>Log Out</span>
                </div>
            </div>
        </aside>
    )
}

// Icons (unchanged)
const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
)

const JobIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" />
        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" />
    </svg>
)

const ApplicationsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
        <path d="M14 2V8H20" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
    </svg>
)

const CandidatesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11684 19.0078 7.005C19.0078 7.89316 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" />
    </svg>
)

const InterviewsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 7L16 12L23 17V7Z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
)

const EventsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const NotificationsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" />
        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" />
    </svg>
)

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15A1.65 1.65 0 0 0 20 12a1.65 1.65 0 0 0-.6-3M21 12h1M7 19.4A1.65 1.65 0 0 0 10 20a1.65 1.65 0 0 0 3-.6M12 21v1M19.4 9A1.65 1.65 0 0 0 20 6a1.65 1.65 0 0 0-3-.6M20.66 4.34l.7-.7M4.6 15A1.65 1.65 0 0 0 4 12a1.65 1.65 0 0 0 .6-3M3 12H2M17 4.6A1.65 1.65 0 0 0 14 4a1.65 1.65 0 0 0-3 .6M12 3V2M4.6 19.4A1.65 1.65 0 0 0 4 22a1.65 1.65 0 0 0 3 .6M3.34 22.66l-.7-.7M4.6 9A1.65 1.65 0 0 0 4 6a1.65 1.65 0 0 0 3 .6M3.34 3.34l-.7.7M17 19.4A1.65 1.65 0 0 0 20 20a1.65 1.65 0 0 0 3-.6M22.66 22.66l.7-.7M20.66 19.66l.7.7" />
    </svg>
)

const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" />
        <path d="M16 17L21 12L16 7" />
        <path d="M21 12H9" />
    </svg>
)

export default HRSidebar
