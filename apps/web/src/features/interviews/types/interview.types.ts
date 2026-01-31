export type InterviewStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Live'
export type InterviewType = 'Technical' | 'Behavioral' | 'Screening' | 'Culture Fit'

export interface Interviewer {
    id: string
    name: string
    avatarUrl?: string
}

export interface Interview {
    id: string
    candidateId: string
    candidateName: string
    candidateRole: string
    date: string // ISO Date string YYYY-MM-DD
    startTime: string // HH:MM 24h format
    endTime: string // HH:MM 24h format
    durationMinutes: number
    platform: 'Google Meet' | 'Zoom' | 'Teams' | 'In-Person' | 'Phone'
    link?: string // Meeting link
    location?: string // Physical location if In-Person
    status: InterviewStatus
    type: InterviewType
    interviewers: Interviewer[]
    notes?: string
    isLive?: boolean // Helper for "Live Now"
}

export interface CreateInterviewPayload {
    candidateId: string
    candidateName: string // In real app, derived from ID
    jobId: string
    date: string
    startTime: string
    duration: number
    type: InterviewType
    platform: string
    interviewers: string[] // IDs
    notes: string
}
