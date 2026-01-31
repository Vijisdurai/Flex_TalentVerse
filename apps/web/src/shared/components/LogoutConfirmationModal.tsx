import React from 'react'
import { useTheme } from '../providers/ThemeContext'

interface LogoutConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (!isOpen) return null

    const overlayBg = 'rgba(0, 0, 0, 0.5)'
    const modalBg = isDark ? '#1F2937' : '#FFFFFF'
    const textColor = isDark ? '#F9FAFB' : '#262626'
    const secondaryTextColor = isDark ? '#9CA3AF' : '#6B7280'
    const borderColor = isDark ? '#374151' : '#E5E7EB'

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div style={{
                width: '400px',
                backgroundColor: modalBg,
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                textAlign: 'center',
                border: `1px solid ${borderColor}`,
                animation: 'scaleIn 0.2s ease-out'
            }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto'
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </div>

                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: textColor,
                    margin: '0 0 12px 0',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>Confirm Logout</h3>

                <p style={{
                    fontSize: '14px',
                    color: secondaryTextColor,
                    margin: '0 0 32px 0',
                    lineHeight: '1.5',
                    fontFamily: 'Century Gothic, sans-serif'
                }}>
                    Are you sure you want to log out of Flex Talentverse?
                    You will need to sign in again to access your dashboard.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px 0',
                            borderRadius: '8px',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: 'transparent',
                            color: textColor,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '12px 0',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#EF4444',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default LogoutConfirmationModal
