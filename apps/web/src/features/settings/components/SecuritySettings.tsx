import React from 'react'
import { SecuritySettings as SecType } from '../types/settings.types'
import { useTheme } from '../../../shared/providers/ThemeContext'
import Toggle from './Toggle'

interface Props {
    data: SecType
    update: (data: Partial<SecType>) => void
}

const SecuritySettings: React.FC<Props> = ({ data, update }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const textColor = isDark ? '#F9FAFB' : '#262626'
    const secondaryText = isDark ? '#9CA3AF' : '#6B7280'

    return (
        <div style={{ backgroundColor: cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${border}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>Security</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: textColor }}>Two-factor Authentication (2FA)</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: secondaryText }}>Add an extra layer of security to your account</p>
                </div>
                <Toggle
                    checked={data.twoFactorEnabled}
                    onChange={(val) => update({ twoFactorEnabled: val })}
                />
            </div>

            <div style={{ padding: '16px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: textColor }}>Last Login</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: secondaryText }}>{data.lastLogin}</p>
                </div>
                <button style={{
                    padding: '8px 16px', borderRadius: '6px', border: '1px solid #FECACA',
                    backgroundColor: 'transparent', color: '#EF4444', fontWeight: 600, fontSize: '13px',
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Log out other sessions
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button style={{
                    padding: '10px 20px', borderRadius: '8px', border: `1px solid ${border}`,
                    backgroundColor: 'transparent', color: textColor, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Manage Security Settings
                </button>
            </div>
        </div>
    )
}

export default SecuritySettings
