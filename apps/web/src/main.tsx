import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './shared/providers/ThemeContext'
import { NotificationsProvider } from './features/notifications/providers/NotificationsProvider'
import App from './app/App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <NotificationsProvider>
                    <App />
                </NotificationsProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
