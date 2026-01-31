import React, { useState } from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import { useNotifications } from '../hooks/useNotifications'
import NotificationCard from '../components/NotificationCard'

const NotificationsPage: React.FC = () => {
    const { theme } = useTheme()
    const {
        groupedNotifications,
        isLoading,
        markAllAsRead,
        undoMarkAllRead,
        canUndo,
        unreadCount
    } = useNotifications()
    const [searchTerm, setSearchTerm] = useState('')
    const isDark = theme === 'dark'

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const sectionTitleColor = isDark ? '#9CA3AF' : '#6B7280'
    const textMain = isDark ? '#F9FAFB' : '#262626'

    // Search Logic
    const filterGroup = (list: any[]) => {
        if (!searchTerm) return list
        return list.filter(n =>
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    const handleMarkAllRead = () => {
        if (unreadCount === 0) return
        const confirmed = window.confirm('Are you sure you want to mark all notifications as read?')
        if (confirmed) {
            markAllAsRead()
        }
    }

    // Explicitly check for unread count to show popup
    const showAllCaughtUp = !isLoading && unreadCount === 0 && !searchTerm

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    height: '64px', backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                    display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between'
                }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '10px 10px 10px 36px', borderRadius: '8px',
                                border: '1px solid #E5E7EB', backgroundColor: isDark ? '#374151' : '#F9FAFB',
                                color: textMain, fontFamily: 'Century Gothic, sans-serif', fontSize: '14px', outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '14px', color: textMain, textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold' }}>Sarah Miller</div>
                            <div style={{ fontSize: '12px', color: '#6B7280' }}>HR Manager</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
                    </div>
                </div>

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h1 style={{
                            fontSize: '24px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            color: textMain, margin: 0
                        }}>
                            Notifications
                        </h1>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {canUndo && (
                                <button
                                    onClick={undoMarkAllRead}
                                    style={{
                                        background: 'none', border: 'none', color: '#009ADD', fontWeight: 600,
                                        fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', cursor: 'pointer', fontSize: '14px'
                                    }}
                                >
                                    Undo
                                </button>
                            )}
                            <button
                                onClick={handleMarkAllRead}
                                disabled={unreadCount === 0}
                                style={{
                                    background: 'none', border: 'none',
                                    color: unreadCount > 0 ? '#009ADD' : '#9CA3AF',
                                    fontWeight: 600,
                                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                                    cursor: unreadCount > 0 ? 'pointer' : 'default',
                                    fontSize: '14px'
                                }}
                            >
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div style={{ color: textMain }}>Loading...</div>
                    ) : (
                        <div>
                            {/* POPUP: Only visible when ALL are read */}
                            {showAllCaughtUp && (
                                <div style={{
                                    padding: '12px 16px', backgroundColor: isDark ? '#374151' : '#F0F9FF',
                                    borderRadius: '8px', marginBottom: '24px', color: '#009ADD',
                                    fontSize: '14px', fontWeight: 500, border: '1px solid #BAE6FD',
                                    display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    <span>✨</span> All caught up! No unread messages.
                                </div>
                            )}

                            {/* LIST: Always visible, dots reappear on Undo */}
                            {['Today', 'Yesterday', 'Earlier'].map(category => {
                                const list = filterGroup(groupedNotifications[category as keyof typeof groupedNotifications])
                                if (list.length === 0) return null
                                return (
                                    <div key={category} style={{ marginBottom: '32px' }}>
                                        <h3 style={{
                                            fontSize: '12px', fontWeight: 600, color: sectionTitleColor,
                                            textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                                        }}>
                                            {category}
                                        </h3>
                                        {list.map(n => <NotificationCard key={n.id} notification={n} />)}
                                    </div>
                                )
                            })}

                            {!searchTerm && Object.values(groupedNotifications).every(g => g.length === 0) && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                                    Your inbox is empty.
                                </div>
                            )}

                            {searchTerm && Object.values(groupedNotifications).every(g => filterGroup(g).length === 0) && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                                    No notifications match "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default NotificationsPage
