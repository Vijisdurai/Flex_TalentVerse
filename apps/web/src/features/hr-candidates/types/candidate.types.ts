export type CandidateStatus = 'Applied' | 'In Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected'

export interface ExperienceItem {
    id: string
    role: string
    company: string
    duration: string
    description: string
}

export interface EducationItem {
    id: string
    degree: string
    school: string
    year: string
}

export interface TimelineEvent {
    id: string
    title: string
    date: string
    description?: string
    status?: CandidateStatus
}

export interface CandidateProfile {
    id: string
    name: string
    role: string
    location: string
    isRemote: boolean
    experienceYears: number
    avatarUrl: string
    status: CandidateStatus
    previousStatus?: CandidateStatus // Added for Undo logic
    items: string[] // e.g. "Figma", "Agile"
    about: string
    experience: ExperienceItem[]
    education: EducationItem[]
    resumeName: string
    applicationTimeline: TimelineEvent[]
    notes: string // For mock persistence
}
