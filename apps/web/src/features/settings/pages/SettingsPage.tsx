import React, { useState } from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import { useSettings } from '../hooks/useSettings'
import AccountSettings from '../components/AccountSettings'
import OrganizationSettings from '../components/OrganizationSettings'
import SecuritySettings from '../components/SecuritySettings'
import NotificationPreferences from '../components/NotificationPreferences'
import ThemeDisplaySettings from '../components/ThemeDisplaySettings'

const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme()
    const {
        settings,
        updateAccount,
        updateOrganization,
        updateSecurity,
        updateNotifications,
        updateDisplay
    } = useSettings()

    const [searchTerm, setSearchTerm] = useState('')
    const isDark = theme === 'dark'

    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'
    const textSecondary = isDark ? '#9CA3AF' : '#6B7280'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header / Top Bar */}
                <div style={{
                    height: '64px', backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                    display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between'
                }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search settings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px',
                                border: '1px solid #E5E7EB', backgroundColor: isDark ? '#374151' : '#F9FAFB',
                                color: textMain, fontFamily: 'Century Gothic, sans-serif', fontSize: '14px', outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {/* Global Theme Toggle */}
                        <div
                            onClick={toggleTheme}
                            style={{
                                display: 'flex',
                                backgroundColor: isDark ? '#1F2937' : '#F2F2F2',
                                borderRadius: '20px',
                                padding: '4px',
                                cursor: 'pointer',
                                position: 'relative',
                                width: '64px',
                                height: '36px',
                                alignItems: 'center',
                                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                left: isDark ? '32px' : '4px',
                                top: '3px',
                                width: '28px', height: '28px', borderRadius: '50%',
                                backgroundColor: isDark ? '#009ADD' : '#FFFFFF',
                                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
                                zIndex: 1
                            }}></div>

                            <div style={{
                                width: '28px', height: '28px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: isDark ? '#F9FAFB' : '#F1B52C',
                                zIndex: 2,
                                position: 'absolute',
                                left: '4px',
                                transition: 'color 0.3s ease'
                            }}>
                                <SunIcon />
                            </div>

                            <div style={{
                                width: '28px', height: '28px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: isDark ? '#FFFFFF' : '#9CA3AF',
                                zIndex: 2,
                                position: 'absolute',
                                left: '32px',
                                transition: 'color 0.3s ease'
                            }}>
                                <MoonIcon />
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ fontSize: '14px', color: textMain, textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold' }}>Sarah Miller</div>
                                <div style={{ fontSize: '12px', color: isDark ? '#9CA3AF' : '#6B7280' }}>HR Manager</div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover',
                                    border: `2px solid ${isDark ? '#374151' : '#E5E7EB'}`
                                }}
                            />
                        </div>
                    </div>
                </div>

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {/* Title */}
                    <div style={{ marginBottom: '32px' }}>
                        <h1 style={{
                            fontSize: '24px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            color: textMain, margin: '0 0 8px 0'
                        }}>
                            Settings
                        </h1>
                        <p style={{ margin: 0, color: textSecondary, fontSize: '14px' }}>
                            Manage your account, preferences, and system settings
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                        gap: '24px',
                        alignItems: 'start'
                    }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <AccountSettings
                                data={settings.account}
                                update={updateAccount}
                            />
                            <SecuritySettings
                                data={settings.security}
                                update={updateSecurity}
                            />
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <OrganizationSettings
                                data={settings.organization}
                                update={updateOrganization}
                            />
                            <NotificationPreferences
                                data={settings.notifications}
                                update={updateNotifications}
                            />
                            <ThemeDisplaySettings
                                data={settings.display}
                                update={updateDisplay}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


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

export default SettingsPage
