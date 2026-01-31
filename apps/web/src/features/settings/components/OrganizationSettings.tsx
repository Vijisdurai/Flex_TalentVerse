import React from 'react'
import { OrganizationSettings as OrgType } from '../types/settings.types'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface Props {
    data: OrgType
    update: (data: Partial<OrgType>) => void
}

const OrganizationSettings: React.FC<Props> = ({ data, update }) => {
    const { theme } = useTheme()
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
        outline: 'none',
        boxSizing: 'border-box'
    }

    return (
        <div style={{ backgroundColor: cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${border}`, height: '100%' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>Organization Settings</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Company Name</label>
                    <input
                        style={inputStyle}
                        value={data.companyName}
                        onChange={(e) => update({ companyName: e.target.value })}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Email Domain</label>
                    <input
                        style={inputStyle}
                        value={data.emailDomain}
                        onChange={(e) => update({ emailDomain: e.target.value })}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Location</label>
                    <input
                        style={inputStyle}
                        value={data.location}
                        onChange={(e) => update({ location: e.target.value })}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Time Zone</label>
                    <select
                        style={inputStyle}
                        value={data.timezone}
                        onChange={(e) => update({ timezone: e.target.value })}
                    >
                        <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+05:30) India Standard Time</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button style={{
                    padding: '10px 20px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#009ADD', color: '#FFFFFF', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Update Organization Details
                </button>
            </div>
        </div>
    )
}

export default OrganizationSettings
