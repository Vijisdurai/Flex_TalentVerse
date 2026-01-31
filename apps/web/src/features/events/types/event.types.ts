export type EventStatus = 'Upcoming' | 'Completed' | 'Cancelled'
export type EventType = 'Onsite' | 'Webinar' | 'Online'

export interface RecruitmentEvent {
    id: string
    name: string
    status: EventStatus
    type: EventType
    date: string // e.g. "Oct 26, 10:00 AM" or ISO
    location: string // e.g. "Campus Hall B" or "Online"
    registeredCount: number
    viewsCount: number
}
