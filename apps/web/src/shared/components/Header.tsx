import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__brand">
                    <div className="header__logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
                            <path d="M10 13h20M10 20h16M10 27h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="30" cy="27" r="4" fill="white" opacity="0.9" />
                            <defs>
                                <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#009ADD" />
                                    <stop offset="1" stopColor="#005486" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="header__title"><span className="header__title-flex">Flex</span> TalentVerse</span>
                </Link>

                <nav className="header__nav">
                    <a href="#help" className="header__link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>Help Center</span>
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header
