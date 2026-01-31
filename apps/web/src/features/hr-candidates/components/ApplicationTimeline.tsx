import React from 'react'
import { TimelineEvent } from '../types/candidate.types'

interface ApplicationTimelineProps {
    timeline: TimelineEvent[]
}

const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ timeline }) => {
    return (
        <div style={{ marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #F3F4F6' }}>
            <h3 style={{
                fontSize: '15px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: '#262626', marginBottom: '16px', marginTop: 0
            }}>
                Application Timeline
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {timeline.map((event, index) => (
                    <div key={event.id} style={{ display: 'flex', gap: '12px', paddingBottom: index === timeline.length - 1 ? 0 : '24px', position: 'relative' }}>

                        {/* Connecting Line */}
                        {index !== timeline.length - 1 && (
                            <div style={{
                                position: 'absolute', top: '10px', left: '4px', width: '2px', height: '100%',
                                backgroundColor: '#E5E7EB'
                            }}></div>
                        )}

                        {/* Dot */}
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: index === 0 ? '#009ADD' : '#E5E7EB', // Active is Blue, others gray
                            border: '2px solid #FFFFFF',
                            boxShadow: '0 0 0 1px ' + (index === 0 ? '#009ADD' : '#E5E7EB'),
                            flexShrink: 0, marginTop: '4px', zIndex: 1
                        }}></div>

                        <div>
                            <div style={{
                                fontSize: '11px', color: '#9CA3AF', marginBottom: '2px', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {event.date}
                            </div>
                            <div style={{
                                fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '2px',
                                fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                            }}>
                                {event.title}
                            </div>
                            <div style={{
                                fontSize: '12px', color: '#6B7280', fontFamily: 'Century Gothic, sans-serif'
                            }}>
                                {event.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApplicationTimeline
