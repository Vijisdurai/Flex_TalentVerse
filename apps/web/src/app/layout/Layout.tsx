import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import './Layout.css'

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    const location = useLocation()
    const isLandingPage = location.pathname === '/'

    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                {children}
            </main>
            {!isLandingPage && <Footer />}
        </div>
    )
}

export default Layout
