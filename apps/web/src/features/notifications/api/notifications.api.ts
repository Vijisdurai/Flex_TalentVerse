import { Notification } from '../types/notification.types'

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'n-1',
        category: 'Today',
        title: 'New application received',
        description: 'Alex Johnson applied for Senior Product Designer role.',
        timestamp: '10 min ago',
        isRead: false,
        actionLabel: 'View Candidate',
        actionLink: '/hr-dashboard/applications/1' // Mapping to CandidateProfile for Alex (ID 1)
    },
    {
        id: 'n-2',
        category: 'Today',
        title: 'Candidate shortlisted',
        description: 'Maria Garcia was shortlisted for Frontend Developer.',
        timestamp: '1 hour ago',
        isRead: false,
        actionLabel: 'View Application',
        actionLink: '/hr-dashboard/applications' // Kanban view centered on Maria
    },
    {
        id: 'n-3',
        category: 'Today',
        title: 'Interview scheduled',
        description: 'Technical round scheduled with David Kim for tomorrow at 2:00 PM.',
        timestamp: '3 hours ago',
        isRead: false,
        actionLabel: 'View Interview Details',
        actionLink: '/hr-dashboard/interviews'
    },
    {
        id: 'n-4',
        category: 'Yesterday',
        title: 'Interview completed',
        description: 'Behavioral interview with Sarah Connor has been marked as completed.',
        timestamp: 'Yesterday, 4:30 PM',
        isRead: true,
        actionLabel: 'Add Feedback',
        actionLink: '/hr-dashboard/interviews' // Specific section for feedback
    },
    {
        id: 'n-5',
        category: 'Yesterday',
        title: 'Candidate rejected',
        description: 'Automated rejection email sent to James Smith for Marketing Lead role.',
        timestamp: 'Yesterday, 11:00 AM',
        isRead: true
    },
    {
        id: 'n-6',
        category: 'Earlier',
        title: 'Job posting published',
        description: '"Senior UX Researcher" is now live on Career Page and LinkedIn.',
        timestamp: 'Oct 20, 2025',
        isRead: true,
        actionLabel: 'View Job',
        actionLink: '/hr-dashboard/job-postings'
    },
    {
        id: 'n-7',
        category: 'Earlier',
        title: 'System Maintenance Alert',
        description: 'Scheduled maintenance on Oct 25th from 2:00 AM to 4:00 AM UTC.',
        timestamp: 'Oct 18, 2025',
        isRead: true
    }
]

export const getEvents = async (): Promise<Notification[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_NOTIFICATIONS])
        }, 500)
    })
}

// Fixed naming error from previous step (getNotifications not getEvents)
export const getNotifications = async (): Promise<Notification[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_NOTIFICATIONS])
        }, 500)
    })
}

export const markAllAsReadApi = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MOCK_NOTIFICATIONS.forEach(n => n.isRead = true)
            resolve(true)
        }, 200)
    })
}
