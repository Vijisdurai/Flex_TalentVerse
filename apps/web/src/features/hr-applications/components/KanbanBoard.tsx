import React from 'react'
import { APPLICATION_STATUSES } from '../types/application.types'
import { MOCK_APPLICATIONS } from '../hooks/useApplications' // Using direct mock import for simplicity
import KanbanColumn from './KanbanColumn'

const KanbanBoard: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            height: 'calc(100vh - 200px)', // Adjust based on header height
            padding: '4px'
        }}>
            {APPLICATION_STATUSES.map(status => (
                <KanbanColumn
                    key={status}
                    status={status}
                    applications={MOCK_APPLICATIONS.filter(app => app.status === status)}
                />
            ))}
        </div>
    )
}

export default KanbanBoard
