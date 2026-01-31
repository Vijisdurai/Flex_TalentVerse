import React from 'react'

interface SkillsTagsProps {
    skills: string[]
}

const SkillsTags: React.FC<SkillsTagsProps> = ({ skills }) => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{
                fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: '#262626', marginBottom: '12px'
            }}>
                Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map(skill => (
                    <span key={skill} style={{
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'Century Gothic, sans-serif'
                    }}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default SkillsTags
