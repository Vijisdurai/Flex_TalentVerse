import React from 'react'
import { Currency } from '../types/createJob.types'

interface SalaryRangeInputProps {
    min: string
    max: string
    currency: Currency
    onMinChange: (val: string) => void
    onMaxChange: (val: string) => void
    onCurrencyChange: (val: string) => void
}

const SalaryRangeInput: React.FC<SalaryRangeInputProps> = ({
    min, max, currency, onMinChange, onMaxChange, onCurrencyChange
}) => {
    return (
        <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
            <div style={{ flex: 1 }}>
                <label style={{
                    display: 'block', marginBottom: '8px',
                    fontSize: '14px', fontWeight: 600, color: '#262626',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Salary Range (Annual)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                        type="text"
                        value={min}
                        onChange={(e) => onMinChange(e.target.value)}
                        placeholder="Min (e.g. 80,000)"
                        style={{
                            flex: 1,
                            height: '48px', padding: '0 16px', borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626', outline: 'none'
                        }}
                    />
                    <span style={{ color: '#6B7280', fontWeight: 500 }}>-</span>
                    <input
                        type="text"
                        value={max}
                        onChange={(e) => onMaxChange(e.target.value)}
                        placeholder="Max (e.g. 120,000)"
                        style={{
                            flex: 1,
                            height: '48px', padding: '0 16px', borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                            fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626', outline: 'none'
                        }}
                    />
                </div>
            </div>

            <div style={{ width: '300px' }}>
                <label style={{
                    display: 'block', marginBottom: '8px',
                    fontSize: '14px', fontWeight: 600, color: '#262626',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}>
                    Currency
                </label>
                <div style={{ position: 'relative' }}>
                    <select
                        value={currency}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        style={{
                            width: '100%', height: '48px', padding: '0 16px', borderRadius: '8px',
                            border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                            fontSize: '14px', fontFamily: 'Century Gothic, sans-serif',
                            color: '#262626', outline: 'none', appearance: 'none', cursor: 'pointer'
                        }}
                    >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>INR (₹)</option>
                        <option>CAD ($)</option>
                    </select>
                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)

export default SalaryRangeInput
