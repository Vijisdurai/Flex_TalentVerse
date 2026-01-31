import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../shared/components/Button'
import './Hero.css'

const Hero: React.FC = () => {
    const navigate = useNavigate()

    return (
        <section className="hero">
            <div className="hero__background"></div>
            <div className="container hero__content">
                <div className="hero__text">
                    <h1 className="hero__title animate-fade-in-up">
                        Transform Your Talent Management with AI
                    </h1>
                    <p className="hero__subtitle animate-fade-in-up">
                        Flex TalentVerse connects the right talent with the right opportunities using intelligent matching, seamless collaboration, and powerful analytics.
                    </p>
                    <div className="hero__actions animate-fade-in-up">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/auth/role-selection')}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
