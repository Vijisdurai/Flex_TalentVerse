import React from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'

const HRTopBar: React.FC = () => {
    const { theme, toggleTheme } = useTheme()
    const isDarkMode = theme === 'dark'

    const bg = isDarkMode ? '#111827' : '#FFFFFF'
    const border = isDarkMode ? '#374151' : '#E0E0E0'
    const textMain = isDarkMode ? '#F9FAFB' : '#262626'

    return (
        <header style={{
            height: '80px',
            backgroundColor: bg,
            borderBottom: `1px solid ${border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            {/* Title */}
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: textMain,
                margin: 0
            }}>Dashboard</h1>

            {/* Right Side Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Search Bar */}
                <div style={{
                    position: 'relative',
                    width: '320px'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9CA3AF'
                    }}>
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search candidates, jobs, applications..."
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 16px 0 40px',
                            borderRadius: '8px',
                            border: '1px solid #F2F2F2',
                            backgroundColor: '#F9FAFB',
                            fontSize: '14px',
                            fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Theme Toggle */}
                <div
                    onClick={toggleTheme}
                    style={{
                        display: 'flex',
                        backgroundColor: '#F2F2F2',
                        borderRadius: '20px',
                        padding: '4px',
                        cursor: 'pointer',
                        position: 'relative',
                        width: '64px',
                        height: '36px',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        left: isDarkMode ? '32px' : '4px',
                        top: '4px',
                        width: '28px', height: '28px', borderRadius: '50%',
                        backgroundColor: '#FFFFFF', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        transition: 'left 0.3s ease',
                        zIndex: 1
                    }}></div>

                    <div style={{
                        width: '28px', height: '28px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isDarkMode ? '#9CA3AF' : '#F1B52C',
                        zIndex: 2,
                        position: 'absolute',
                        left: '4px'
                    }}>
                        <SunIcon />
                    </div>

                    <div style={{
                        width: '28px', height: '28px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isDarkMode ? '#BA257D' : '#9CA3AF',
                        zIndex: 2,
                        position: 'absolute',
                        left: '32px'
                    }}>
                        <MoonIcon />
                    </div>
                </div>

                {/* Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            fontSize: '14px', fontWeight: 'bold', color: '#262626',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                        }}>Sarah Miller</div>
                        <div style={{
                            fontSize: '12px', color: '#6B7280',
                            fontFamily: 'Century Gothic, sans-serif'
                        }}>HR Manager</div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </header>
    )
}

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)

const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
)

export default HRTopBar
