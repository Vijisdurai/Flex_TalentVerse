import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import './Header.css'

function Header() {
    const navigate = useNavigate()

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
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => navigate('/auth/role-selection')}
                    >
                        Sign Up / Login
                    </Button>
                </nav>
            </div>
        </header>
    )
}

export default Header

