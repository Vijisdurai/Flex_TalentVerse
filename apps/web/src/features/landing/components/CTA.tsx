import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../shared/components/Button'
import './CTA.css'

const CTA: React.FC = () => {
    const navigate = useNavigate()

    return (
        <section className="cta">
            <div className="container">
                <div className="cta__content">
                    <h2 className="cta__title">Ready to Transform Your Talent Management?</h2>
                    <p className="cta__description">
                        Join thousands of organizations already using Flex TalentVerse to find, manage, and grow their talent.
                    </p>
                    <div className="cta__actions">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => navigate('/auth/role-selection')}
                        >
                            Get Started Free
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
