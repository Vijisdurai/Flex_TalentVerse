import React from 'react'
import { AccountSettings as AccountType } from '../types/settings.types'
import { useTheme } from '../../../shared/providers/ThemeContext'
import { useLogout } from '../../../shared/providers/LogoutProvider'

interface Props {
    data: AccountType
    update: (data: Partial<AccountType>) => void
}

const AccountSettings: React.FC<Props> = ({ data, update }) => {
    const { theme } = useTheme()
    const { openLogoutModal } = useLogout()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const labelColor = isDark ? '#9CA3AF' : '#6B7280'
    const inputBg = isDark ? '#374151' : '#F9FAFB'
    const textColor = isDark ? '#F9FAFB' : '#262626'

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: `1px solid ${border}`,
        backgroundColor: inputBg,
        color: textColor,
        fontFamily: 'Century Gothic, sans-serif',
        fontSize: '14px',
        outline: 'none'
    }

    return (
        <div style={{ backgroundColor: cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${border}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>Account Settings</h3>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Avatar Placeholder */}
                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E5E7EB',
                        backgroundImage: data.avatar ? `url(${data.avatar})` : 'none',
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }} />
                    <button style={{
                        position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px',
                        borderRadius: '50%', border: 'none', backgroundColor: '#009ADD', color: '#FFF',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
                    }}>
                        ✎
                    </button>
                </div>

                {/* Fields */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Full Name</label>
                        <input
                            style={inputStyle}
                            value={data.fullName}
                            onChange={(e) => update({ fullName: e.target.value })}
                        />
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Role</label>
                        <input style={{ ...inputStyle, opacity: 0.6 }} value={data.role} readOnly />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Email Address</label>
                        <input style={{ ...inputStyle, opacity: 0.6 }} value={data.email} readOnly />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button style={{
                    padding: '10px 20px', borderRadius: '8px', border: `1px solid ${border}`,
                    backgroundColor: 'transparent', color: textColor, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Change Password
                </button>
                <button
                    onClick={openLogoutModal}
                    style={{
                        padding: '10px 20px', borderRadius: '8px', border: '1px solid #EF4444',
                        backgroundColor: 'transparent', color: '#EF4444', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                    }}
                >
                    Log Out
                </button>
                <button style={{
                    padding: '10px 20px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#009ADD', color: '#FFFFFF', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default AccountSettings
