import { RecruitmentEvent } from '../types/event.types'

const MOCK_EVENTS: RecruitmentEvent[] = [
    {
        id: 'e-1',
        name: 'Tech Career Fair',
        status: 'Upcoming',
        type: 'Onsite',
        date: 'Oct 26, 10:00 AM',
        location: 'Campus Hall B',
        registeredCount: 342,
        viewsCount: 1200
    },
    {
        id: 'e-2',
        name: 'Resume Workshop',
        status: 'Upcoming',
        type: 'Webinar',
        date: 'Nov 02, 2:00 PM',
        location: 'Online',
        registeredCount: 86,
        viewsCount: 210
    }
]

export const getEvents = async (): Promise<RecruitmentEvent[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_EVENTS])
        }, 600)
    })
}
