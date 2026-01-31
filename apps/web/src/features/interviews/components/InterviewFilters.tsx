import React from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'

const InterviewFilters: React.FC = () => {
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
        outline: 'none'
    }

    return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Date Filte r*/}
            <div style={selectStyle}>
                <span style={{ marginRight: '8px' }}>📅</span>
                Today
            </div>

            {/* Job Filter */}
            <div style={selectStyle}>
                <span style={{ marginRight: '8px' }}>💼</span>
                All Jobs
            </div>

            {/* Status Filter */}
            <div style={selectStyle}>
                <span style={{ marginRight: '8px' }}>⚡</span>
                Status: All
            </div>
        </div>
    )
}

export default InterviewFilters
