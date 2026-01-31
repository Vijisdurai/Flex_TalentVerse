import React from 'react'
import { Application, ApplicationStatus } from '../types/application.types'
import ApplicationCard from './ApplicationCard'
import { useTheme } from '../../../shared/providers/ThemeContext'

interface KanbanColumnProps {
    status: ApplicationStatus
    applications: Application[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, applications }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const getHeaderColor = (s: ApplicationStatus) => {
        switch (s) {
            case 'Applied': return '#009ADD'
            case 'In Review': return '#F59E0B'
            case 'Shortlisted': return '#BA257D'
            case 'Interview': return '#10B981' // Greenish for interview in some designs, but prompt said Gold? Image looks green dot.
            // Prompt says: "Interview: Gold #F1B52C". Image has a GREEN dot for Interview column? 
            // Wait, looking at the image: 
            // Applied (Blue dot), In Review (Yellow/Orange dot), Shortlisted (Purple dot), Interview (Green dot), Selected (Green dot), Rejected (Red dot).
            // I will match the PROMPT description for colors if distinct, but the image is the "Design Reference".
            // Image: Interview has a GREEN dot. Selected has a GREEN dot.
            // Prompt says: "Green #82BC00 (selected / success), Gold #F1B52C (interview highlight)". 
            // I will stick to the IMAGE for the column header dots as "Visual reference" is usually king for UI.
            // Actually, let's use the provided palette properly.
            case 'Selected': return '#82BC00'
            case 'Rejected': return '#EF4444'
            default: return '#009ADD'
        }
    }

    // Override for Interview based on image (looks green) vs prompt (Gold). 
    // I'll use Green for Interview header to match image visual.
    const dotColor = status === 'Interview' ? '#82BC00' : getHeaderColor(status)

    return (
        <div style={{
            flex: '0 0 300px', // Fixed width columns
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F9FAFB', // Very light background for column area? Or transparent? Image looks like white board, grey columns?
            // Image shows columns have a slight grey tint or just separate? 
            // Actually the background is white, columns seem to be just regions.
            // Let's make them transparent but with a header.
            height: '100%'
        }}>
            {/* Column Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 4px', marginBottom: '8px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dotColor }}></div>
                    <span style={{
                        fontSize: '14px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                        color: isDark ? '#F9FAFB' : '#262626'
                    }}>
                        {status}
                    </span>
                </div>
                <span style={{
                    backgroundColor: '#E5E7EB', color: '#6B7280',
                    fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px',
                    fontFamily: 'Century Gothic, sans-serif'
                }}>
                    {applications.length}
                </span>
            </div>

            {/* Cards Container */}
            <div style={{
                flex: 1, overflowY: 'auto', paddingRight: '8px',
                // Scrollbar styling could be added here
            }}>
                {applications.map(app => (
                    <ApplicationCard key={app.id} app={app} />
                ))}
            </div>
        </div>
    )
}

export default KanbanColumn
