import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__container">
                <nav className="footer__links">
                    <a href="#privacy" className="footer__link">Privacy Policy</a>
                    <a href="#terms" className="footer__link">Terms of Service</a>
                    <a href="#support" className="footer__link">Contact Support</a>
                </nav>
                <p className="footer__copyright">
                    © {currentYear} Flex Ltd. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
