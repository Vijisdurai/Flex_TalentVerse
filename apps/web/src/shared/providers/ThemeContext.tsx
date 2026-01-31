import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light')

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    // Effect to potentially behave like a real theme switcher (e.g. body class)
    // For now we just provide the state context
    useEffect(() => {
        // Optional: Persist to localStorage
        const savedTheme = localStorage.getItem('flex-theme') as Theme
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('flex-theme', theme)
        // Simple body background toggle for quick global effect
        document.body.style.backgroundColor = theme === 'light' ? '#F9FAFB' : '#111827'
        document.body.style.color = theme === 'light' ? '#262626' : '#F9FAFB'
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
