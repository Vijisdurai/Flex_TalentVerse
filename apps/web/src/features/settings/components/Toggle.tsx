import React from 'react'

interface ToggleProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
    return (
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '44px',
                height: '24px',
                backgroundColor: checked ? '#009ADD' : '#E5E7EB',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }}
        >
            <div style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: checked ? '23px' : '3px',
                transition: 'left 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }} />
        </div>
    )
}

export default Toggle
