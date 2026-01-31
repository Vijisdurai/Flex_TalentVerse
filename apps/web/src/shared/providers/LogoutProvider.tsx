import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LogoutConfirmationModal from '../components/LogoutConfirmationModal'

interface LogoutContextType {
    openLogoutModal: () => void
    closeLogoutModal: () => void
    isLoggingOut: boolean
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined)

export const LogoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth()

    const openLogoutModal = () => setIsOpen(true)
    const closeLogoutModal = () => setIsOpen(false)

    const handleConfirmLogout = () => {
        // 1. Clear frontend auth state via context
        logout()

        // 2. Feedback loop
        setIsOpen(false)
        setShowSuccessToast(true)

        // 3. Redirect after a brief delay to show toast
        setTimeout(() => {
            setShowSuccessToast(false)
            navigate('/') // Redirect to landing page
        }, 2000)
    }

    return (
        <LogoutContext.Provider value={{ openLogoutModal, closeLogoutModal, isLoggingOut: isOpen }}>
            {children}
            <LogoutConfirmationModal
                isOpen={isOpen}
                onClose={closeLogoutModal}
                onConfirm={handleConfirmLogout}
            />

            {/* Simple Success Toast */}
            {showSuccessToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#059669',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 1100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Successfully logged out
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </LogoutContext.Provider>
    )
}

export const useLogout = () => {
    const context = useContext(LogoutContext)
    if (context === undefined) {
        throw new Error('useLogout must be used within a LogoutProvider')
    }
    return context
}
