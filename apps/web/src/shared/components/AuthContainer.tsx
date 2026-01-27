import { ReactNode } from 'react'
import './AuthContainer.css'

interface AuthContainerProps {
    title: string
    subtitle?: string
    children: ReactNode
}

function AuthContainer({ title, subtitle, children }: AuthContainerProps) {
    return (
        <div className="auth-container animate-scale-in">
            <div className="auth-container__header">
                <h1 className="auth-container__title">{title}</h1>
                {subtitle && <p className="auth-container__subtitle">{subtitle}</p>}
            </div>
            <div className="auth-container__content">
                {children}
            </div>
        </div>
    )
}

export default AuthContainer
