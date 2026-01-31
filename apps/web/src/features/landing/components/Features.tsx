import React from 'react'
import Card from '../../../shared/components/Card'
import './Features.css'

interface Feature {
    id: string
    title: string
    description: string
    icon: string
    gradient: string
}

const features: Feature[] = [
    {
        id: 'ai-matching',
        title: 'AI-Powered Matching',
        description: 'Intelligent algorithms connect the right talent with the right opportunities, saving time and improving match quality.',
        icon: '/assets/feature-ai-matching.png',
        gradient: 'var(--gradient-blue)'
    },
    {
        id: 'collaboration',
        title: 'Seamless Collaboration',
        description: 'Built-in communication tools enable teams to work together effectively, from initial contact to project completion.',
        icon: '/assets/feature-collaboration.png',
        gradient: 'var(--gradient-fuchsia)'
    },
    {
        id: 'analytics',
        title: 'Powerful Analytics',
        description: 'Gain insights into talent performance, project outcomes, and hiring trends with comprehensive analytics dashboards.',
        icon: '/assets/feature-analytics.png',
        gradient: 'var(--gradient-gold)'
    }
]

const Features: React.FC = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <div className="features__header">
                    <h2 className="features__title">Why Choose Flex TalentVerse?</h2>
                    <p className="features__subtitle">
                        Everything you need to manage talent effectively in one powerful platform
                    </p>
                </div>

                <div className="features__grid">
                    {features.map((feature, index) => (
                        <Card
                            key={feature.id}
                            variant="elevated"
                            hoverable
                            className="feature-card animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-card__icon">
                                <img src={feature.icon} alt={feature.title} />
                            </div>
                            <h3 className="card__title">{feature.title}</h3>
                            <p className="card__description">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
