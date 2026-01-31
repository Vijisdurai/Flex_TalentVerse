import React from 'react'
import { EventStatus } from '../types/event.types'

interface BadgeProps {
    status: EventStatus
}

const EventStatusBadge: React.FC<BadgeProps> = ({ status }) => {

    const getStyle = () => {
        switch (status) {
            case 'Upcoming': return { bg: '#E0F2FE', color: '#009ADD' } // Blue
            case 'Completed': return { bg: '#F3F4F6', color: '#4B5563' } // Grey
            case 'Cancelled': return { bg: '#FEF2F2', color: '#EF4444' } // Red
            default: return { bg: '#F3F4F6', color: '#4B5563' }
        }
    }

    const style = getStyle()

    return (
        <span style={{
            backgroundColor: style.bg,
            color: style.color,
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'Century Gothic, sans-serif'
        }}>
            {status}
        </span>
    )
}

export default EventStatusBadge
