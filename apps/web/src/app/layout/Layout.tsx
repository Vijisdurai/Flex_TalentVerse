import { ReactNode } from 'react'
import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import './Layout.css'

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
