import React from 'react'
import { DisplaySettings as DispType } from '../types/settings.types'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface Props {
    data: DispType
    update: (data: Partial<DispType>) => void
}

const ThemeDisplaySettings: React.FC<Props> = ({ data, update }) => {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    const cardBg = isDark ? '#1F2937' : '#FFFFFF'
    const border = isDark ? '#374151' : '#E5E7EB'
    const textColor = isDark ? '#F9FAFB' : '#262626'
    const labelColor = isDark ? '#9CA3AF' : '#6B7280'

    return (
        <div style={{ backgroundColor: cardBg, padding: '24px', borderRadius: '12px', border: `1px solid ${border}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif' }}>Theme & Display</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>Interface Theme</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => theme === 'dark' && toggleTheme()}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${theme === 'light' ? '#009ADD' : border}`,
                                backgroundColor: theme === 'light' ? '#F0F9FF' : 'transparent',
                                color: theme === 'light' ? '#009ADD' : secondaryText,
                                fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            ☀️ Light
                        </button>
                        <button
                            onClick={() => theme === 'light' && toggleTheme()}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? '#009ADD' : border}`,
                                backgroundColor: theme === 'dark' ? '#1E293B' : 'transparent',
                                color: theme === 'dark' ? '#009ADD' : secondaryText,
                                fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            🌙 Dark
                        </button>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '12px', color: labelColor, fontWeight: 600 }}>UI Density</label>
                    <select
                        style={{
                            width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${border}`,
                            backgroundColor: isDark ? '#374151' : '#F9FAFB', color: textColor, outline: 'none'
                        }}
                        value={data.density}
                        onChange={(e) => update({ density: e.target.value as any })}
                    >
                        <option>Comfortable</option>
                        <option>Compact</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button style={{
                    color: '#009ADD', fontWeight: 600, background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Update
                </button>
            </div>
        </div>
    )
}

const secondaryText = '#64748b'

export default ThemeDisplaySettings
