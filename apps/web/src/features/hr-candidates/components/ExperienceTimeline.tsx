import React from 'react'
import { ExperienceItem } from '../types/candidate.types'

interface ExperienceTimelineProps {
    exercises: ExperienceItem[]
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ exercises }) => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{
                fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: '#262626', marginBottom: '16px'
            }}>
                Experience
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {exercises.map((exp) => (
                    <div key={exp.id} style={{ display: 'flex', gap: '16px' }}>
                        {/* Icon / Avatar for Company (Placeholder Letter) */}
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '8px',
                            backgroundColor: '#F3F4F6', color: '#6B7280',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px', fontWeight: 'bold', flexShrink: 0,
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                        }}>
                            {exp.company.charAt(0)}
                        </div>

                        <div>
                            <h4 style={{
                                margin: 0, fontSize: '15px', fontWeight: 'bold',
                                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                            }}>
                                {exp.role}
                            </h4>
                            <div style={{
                                fontSize: '13px', color: '#009ADD', fontWeight: 600, fontFamily: 'Century Gothic, sans-serif',
                                marginBottom: '4px'
                            }}>
                                {exp.company}
                            </div>
                            <div style={{
                                fontSize: '12px', color: '#9CA3AF', marginBottom: '8px', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {exp.duration}
                            </div>
                            <p style={{
                                margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: '1.5', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ borderBottom: '1px solid #F3F4F6', marginTop: '24px' }}></div>
        </div>
    )
}

export default ExperienceTimeline
