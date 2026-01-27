import { InputHTMLAttributes, ReactNode, useState } from 'react'
import './Input.css'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label: string
    error?: string
    helperText?: string
    icon?: ReactNode
    size?: 'sm' | 'md' | 'lg'
}

function Input({
    label,
    error,
    helperText,
    icon,
    size = 'md',
    type = 'text',
    className = '',
    id,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const containerClasses = [
        'input-field',
        `input-field--${size}`,
        error && 'input-field--error',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={containerClasses}>
            <label htmlFor={inputId} className="input-field__label">
                {label}
            </label>
            <div className="input-field__wrapper">
                {icon && <span className="input-field__icon">{icon}</span>}
                <input
                    id={inputId}
                    type={inputType}
                    className="input-field__input"
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="input-field__toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {(error || helperText) && (
                <span className={`input-field__helper ${error ? 'input-field__helper--error' : ''}`}>
                    {error || helperText}
                </span>
            )}
        </div>
    )
}

export default Input
