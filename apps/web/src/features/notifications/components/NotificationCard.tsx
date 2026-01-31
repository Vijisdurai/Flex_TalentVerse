import React from 'react'
import { Link } from 'react-router-dom'
import { Notification } from '../types/notification.types'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface NotificationCardProps {
    notification: Notification
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const titleColor = isDark ? '#F9FAFB' : '#111827' // Darker grey/black for titles
    const descColor = isDark ? '#9CA3AF' : '#4B5563'
    const timeColor = isDark ? '#9CA3AF' : '#9CA3AF'

    return (
        <div style={{
            backgroundColor: cardBg,
            padding: '20px 24px',
            borderRadius: '8px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            position: 'relative' // For the timestamp absolute positioning if needed, though flex is better
        }}>
            {/* Unread Indicator Dot */}
            <div style={{ paddingTop: '6px' }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: notification.isRead ? 'transparent' : '#009ADD'
                }}></div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h4 style={{
                        margin: 0, fontSize: '15px', fontWeight: 600,
                        color: titleColor, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}>
                        {notification.title}
                    </h4>
                    <span style={{
                        fontSize: '12px', color: timeColor, fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        {notification.timestamp}
                    </span>
                </div>

                <p style={{
                    margin: '0 0 8px 0', fontSize: '14px', color: descColor,
                    lineHeight: '1.5', fontFamily: 'Century Gothic, sans-serif'
                }}>
                    {notification.description}
                </p>

                {/* Action Link */}
                {notification.actionLabel && notification.actionLink && (
                    <Link
                        to={notification.actionLink}
                        style={{
                            fontSize: '13px', fontWeight: 600, color: '#009ADD',
                            textDecoration: 'none', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                        }}
                    >
                        {notification.actionLabel}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NotificationCard
