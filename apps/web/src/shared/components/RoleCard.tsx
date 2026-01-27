import { ReactNode } from 'react'
import './RoleCard.css'

interface RoleCardProps {
    title: string
    description: string
    icon: ReactNode
    selected: boolean
    onClick: () => void
}

function RoleCard({ title, description, icon, selected, onClick }: RoleCardProps) {
    return (
        <button
            type="button"
            className={`role-card ${selected ? 'role-card--selected' : ''}`}
            onClick={onClick}
            aria-pressed={selected}
        >
            <div className="role-card__icon">{icon}</div>
            <div className="role-card__content">
                <h4 className="role-card__title">{title}</h4>
                <p className="role-card__description">{description}</p>
            </div>
            <div className="role-card__indicator">
                {selected && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12" />
                    </svg>
                )}
            </div>
        </button>
    )
}

export default RoleCard
