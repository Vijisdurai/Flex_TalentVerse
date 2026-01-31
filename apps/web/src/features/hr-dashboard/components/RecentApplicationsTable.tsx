import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecentApplicationsTable: React.FC = () => {
    const navigate = useNavigate()
    const applications = [
        {
            id: 1, name: 'Arjun Patel', role: 'Frontend Engineer', time: '2 hours ago', status: 'Applied', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 2, name: 'Li Wei', role: 'UX Designer', time: '5 hours ago', status: 'Shortlisted', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 3, name: 'Marcus Cole', role: 'Product Manager', time: '1 day ago', status: 'Rejected', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 4, name: 'Sofia Rodriguez', role: 'Data Analyst', time: '1 day ago', status: 'Applied', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied': return { bg: 'rgba(0, 154, 221, 0.1)', color: '#009ADD' }
            case 'Shortlisted': return { bg: 'rgba(130, 188, 0, 0.1)', color: '#82BC00' }
            case 'Rejected': return { bg: 'rgba(186, 37, 125, 0.1)', color: '#BA257D' }
            default: return { bg: '#F2F2F2', color: '#6B7280' }
        }
    }

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
            flex: 2
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{
                    fontSize: '18px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', color: '#262626'
                }}>Recent Applications</h3>
                <span
                    onClick={() => navigate('/hr-dashboard/applications')}
                    style={{ fontSize: '14px', color: '#009ADD', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}
                >
                    View All
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #F2F2F2' }}>
                        <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500, fontFamily: 'Century Gothic' }}>Candidate</th>
                        <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500, fontFamily: 'Century Gothic' }}>Job Role</th>
                        <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500, fontFamily: 'Century Gothic' }}>Status</th>
                        <th style={{ textAlign: 'right', padding: '12px 0', fontSize: '12px', color: '#6B7280', fontWeight: 500, fontFamily: 'Century Gothic' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id} style={{ borderBottom: '1px solid #F2F2F2' }}>
                            <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={app.avatar} alt={app.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#262626' }}>{app.name}</div>
                                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{app.time}</div>
                                </div>
                            </td>
                            <td style={{ padding: '16px 0', fontSize: '14px', color: '#4B5563' }}>{app.role}</td>
                            <td style={{ padding: '16px 0' }}>
                                <span style={{
                                    backgroundColor: getStatusColor(app.status).bg,
                                    color: getStatusColor(app.status).color,
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: 600
                                }}>
                                    {app.status}
                                </span>
                            </td>
                            <td style={{ padding: '16px 0', textAlign: 'right' }}>
                                <button
                                    onClick={() => navigate(`/hr-dashboard/applications/${app.id}`)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '6px',
                                        padding: '6px 16px',
                                        fontSize: '12px',
                                        color: '#374151',
                                        cursor: 'pointer'
                                    }}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecentApplicationsTable
