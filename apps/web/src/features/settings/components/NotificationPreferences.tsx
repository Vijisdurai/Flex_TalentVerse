import React from 'react'
import { NotificationPreferences as NotifType } from '../types/settings.types'
import { useTheme } from '../../../shared/providers/ThemeContext'
import Toggle from './Toggle'

interface Props {
    data: NotifType
    update: (data: Partial<NotifType>) => void
}

const NotificationPreferences: React.FC<Props> = ({ data, update }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const textColor = isDark ? '#F9FAFB' : '#262626'

    const items = [
        { key: 'newApplication', label: 'New application received' },
        { key: 'candidateShortlisted', label: 'Candidate shortlisted' },
        { key: 'interviewScheduled', label: 'Interview scheduled' },
        { key: 'eventRegistrations', label: 'Event registrations' },
        { key: 'systemAnnouncements', label: 'System announcements' }
    ]

    return (
        <div style={{ backgroundColor: cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${border}`, height: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>Notification Preferences</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {items.map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${border}`, paddingBottom: '12px' }}>
                        <span style={{ fontSize: '14px', color: textColor }}>{item.label}</span>
                        <Toggle
                            checked={data[item.key as keyof NotifType]}
                            onChange={(val) => update({ [item.key]: val })}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationPreferences
