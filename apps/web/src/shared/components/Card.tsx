import React from 'react'
import './Card.css'

export interface CardProps {
    children: React.ReactNode
    variant?: 'default' | 'elevated' | 'gradient'
    className?: string
    onClick?: () => void
    hoverable?: boolean
    style?: React.CSSProperties
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    className = '',
    onClick,
    hoverable = false,
    style
}) => {
    const classes = [
        'card',
        `card--${variant}`,
        hoverable ? 'card--hoverable' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} onClick={onClick} style={style}>
            {children}
        </div>
    )
}

export default Card
