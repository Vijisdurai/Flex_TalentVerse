import React from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'
import { EventStatus, EventType } from '../types/event.types'

interface EventFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    typeFilter: EventType | 'All'
    onTypeChange: (value: EventType | 'All') => void
    statusFilter: EventStatus | 'All'
    onStatusChange: (value: EventStatus | 'All') => void
    sortBy: 'Upcoming' | 'Recent'
    onSortChange: (value: 'Upcoming' | 'Recent') => void
}

const EventFilters: React.FC<EventFiltersProps> = ({
    searchTerm, onSearchChange,
    typeFilter, onTypeChange,
    statusFilter, onStatusChange,
    sortBy, onSortChange
}) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const bg = isDark ? '#374151' : '#FFFFFF'
    const border = isDark ? '#4B5563' : '#E5E7EB'
    const text = isDark ? '#F3F4F6' : '#374151'

    const selectStyle: React.CSSProperties = {
        padding: '8px 12px',
        borderRadius: '8px',
        border: `1px solid ${border}`,
        backgroundColor: bg,
        color: text,
        fontFamily: 'Century Gothic, sans-serif',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
        minWidth: '140px'
    }

    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }}>🔍</span>
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 36px',
                        borderRadius: '8px',
                        border: `1px solid ${border}`,
                        backgroundColor: bg,
                        color: text,
                        fontFamily: 'Century Gothic, sans-serif',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Event Type Filter */}
            <select
                value={typeFilter}
                onChange={(e) => onTypeChange(e.target.value as EventType | 'All')}
                style={selectStyle}
            >
                <option value="All">Event Type: All</option>
                <option value="Onsite">Onsite</option>
                <option value="Webinar">Webinar</option>
                <option value="Online">Online</option>
            </select>

            {/* Status Filter */}
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as EventStatus | 'All')}
                style={selectStyle}
            >
                <option value="All">Status: All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            {/* Sort */}
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as 'Upcoming' | 'Recent')}
                style={selectStyle}
            >
                <option value="Upcoming">Sort by: Upcoming</option>
                <option value="Recent">Sort by: Recent</option>
            </select>
        </div>
    )
}

export default EventFilters
