import React from 'react'
import { EducationItem } from '../types/candidate.types'

interface EducationSectionProps {
    educationValues: EducationItem[]
}

const EducationSection: React.FC<EducationSectionProps> = ({ educationValues }) => {
    return (
        <div>
            <h3 style={{
                fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: '#262626', marginBottom: '16px'
            }}>
                Education
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {educationValues.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '8px',
                            backgroundColor: '#EFF6FF', color: '#009ADD',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px', fontWeight: 'bold', flexShrink: 0,
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                        }}>
                            U
                        </div>

                        <div>
                            <h4 style={{
                                margin: 0, fontSize: '14px', fontWeight: 'bold',
                                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                            }}>
                                {edu.degree}
                            </h4>
                            <div style={{
                                fontSize: '13px', color: '#009ADD', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {edu.school}
                            </div>
                            <div style={{
                                fontSize: '12px', color: '#9CA3AF', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {edu.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EducationSection
