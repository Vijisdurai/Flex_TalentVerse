import React from 'react'
import Footer from '../../shared/components/Footer'
import './LandingPage.css'

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <div className="landing-page__content">
                <div className="landing-page__hero">
                    <h1 className="landing-page__title animate-fade-in-up">
                        Transform Your Talent Management with AI
                    </h1>
                    <p className="landing-page__subtitle animate-fade-in-up">
                        Flex TalentVerse connects the right talent with the right opportunities using intelligent matching, seamless collaboration, and powerful analytics.
                    </p>

                    <div className="landing-page__features">
                        <div className="feature-item animate-fade-in-up">
                            <div className="feature-item__icon">
                                <img src="/assets/feature-ai-matching.png" alt="AI Matching" />
                            </div>
                            <h3 className="feature-item__title">AI-Powered Matching</h3>
                            <p className="feature-item__description">Intelligent algorithms connect talent with opportunities</p>
                        </div>

                        <div className="feature-item animate-fade-in-up">
                            <div className="feature-item__icon">
                                <img src="/assets/feature-collaboration.png" alt="Collaboration" />
                            </div>
                            <h3 className="feature-item__title">Seamless Collaboration</h3>
                            <p className="feature-item__description">Built-in tools for effective teamwork</p>
                        </div>

                        <div className="feature-item animate-fade-in-up">
                            <div className="feature-item__icon">
                                <img src="/assets/feature-analytics.png" alt="Analytics" />
                            </div>
                            <h3 className="feature-item__title">Powerful Analytics</h3>
                            <p className="feature-item__description">Comprehensive insights and performance tracking</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage
