import React from 'react'
import { InterviewStatus, InterviewType } from '../types/interview.types'

interface BadgeProps {
    status?: InterviewStatus
    type?: InterviewType
    kind: 'status' | 'type'
}

const InterviewStatusBadge: React.FC<BadgeProps> = ({ status, type, kind }) => {

    const getStyle = () => {
        if (kind === 'status' && status) {
            switch (status) {
                case 'Confirmed': return { bg: '#F0FDF4', color: '#006432' } // Green
                case 'Scheduled': return { bg: '#F3F4F6', color: '#4B5563' } // Grey
                case 'Live': return { bg: '#FEF2F2', color: '#E74C3C' } // Red/Live
                case 'Completed': return { bg: '#F9FAFB', color: '#9CA3AF' }
                case 'Cancelled': return { bg: '#FEF2F2', color: '#EF4444' }
                default: return { bg: '#F3F4F6', color: '#4B5563' }
            }
        }

        if (kind === 'type' && type) {
            switch (type) {
                case 'Technical': return { bg: '#EFF6FF', color: '#009ADD' } // Blue
                case 'Behavioral': return { bg: '#F0F9FF', color: '#005486' } // Dark Blue
                case 'Culture Fit': return { bg: '#ECFDF5', color: '#059669' } // Emeraldish
                case 'Screening': return { bg: '#FDF4FF', color: '#BA257D' } // Fuchsia
                default: return { bg: '#F3F4F6', color: '#4B5563' }
            }
        }

        return { bg: '#F3F4F6', color: '#4B5563' }
    }

    const style = getStyle()

    return (
        <span style={{
            backgroundColor: style.bg,
            color: style.color,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'Century Gothic, sans-serif',
            display: 'inline-block'
        }}>
            {kind === 'status' ? status : type}
        </span>
    )
}

export default InterviewStatusBadge
