import { Application } from '../types/application.types'

export const MOCK_APPLICATIONS: Application[] = [
    {
        id: '1',
        candidateName: 'Sarah Miller',
        role: 'UX Designer',
        appliedAt: '2h ago',
        status: 'Applied',
        tags: ['Portfolio']
    },
    {
        id: '2',
        candidateName: 'David Chen',
        role: 'Frontend Dev',
        appliedAt: '5h ago',
        status: 'Applied',
        tags: []
    },
    {
        id: '3',
        candidateName: 'Amara Okafor',
        role: 'Product Manager',
        appliedAt: '1d ago',
        status: 'Applied',
        tags: []
    },
    {
        id: '4',
        candidateName: 'James Wilson',
        role: 'Senior Backend',
        appliedAt: 'Reviewed yesterday',
        status: 'In Review',
        internalNote: 'Internal Ref',
    },
    {
        id: '5',
        candidateName: 'Elena Rodriguez',
        role: 'Marketing Lead',
        appliedAt: 'Reviewed 2d ago',
        status: 'In Review',
        tags: []
    },
    {
        id: '6',
        candidateName: 'Arjun Patel',
        role: 'Data Scientist',
        appliedAt: '',
        status: 'Shortlisted',
        tags: ['Strong Match', 'Python', 'SQL']
    },
    {
        id: '7',
        candidateName: 'Mei Lin',
        role: 'UX Researcher',
        appliedAt: 'Tomorrow, 2:00 PM',
        status: 'Interview',
        tags: ['Details']
    },
    {
        id: '8',
        candidateName: 'Marcus Johnson',
        role: 'Eng Manager',
        appliedAt: 'Tech Round Passed',
        status: 'Interview',
        tags: ['Details']
    },
    {
        id: '9',
        candidateName: 'Emily Clark',
        role: 'Staff Engineer',
        appliedAt: 'Offer Sent',
        status: 'Selected',
        tags: []
    },
    {
        id: '10',
        candidateName: 'Tom Baker',
        role: 'Intern',
        appliedAt: 'Not experienced enough',
        status: 'Rejected',
        tags: []
    }
]
