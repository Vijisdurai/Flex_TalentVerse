import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const PlaceholderPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    // Formatting the path to a readable title
    const title = location.pathname
        .split('/')
        .pop()
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()) || 'Page'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#F9FAFB',
            color: '#262626',
            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
        }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{title}</h1>
            <p style={{ fontFamily: 'Century Gothic, sans-serif', color: '#6B7280', marginBottom: '32px' }}>
                This is a placeholder page for demonstration purposes.
            </p>
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: '10px 24px',
                    backgroundColor: '#009ADD',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                Go Back
            </button>
        </div>
    )
}

export default PlaceholderPage
