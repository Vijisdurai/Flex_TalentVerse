export type ApplicationStatus =
    | 'Applied'
    | 'In Review'
    | 'Shortlisted'
    | 'Interview'
    | 'Selected'
    | 'Rejected'

export interface Application {
    id: string
    candidateName: string
    role: string
    appliedAt: string // e.g. "2h ago"
    status: ApplicationStatus
    tags?: string[]
    avatarUrl?: string // Optional, can use placeholder initials
    internalNote?: string
}

export const APPLICATION_STATUSES: ApplicationStatus[] = [
    'Applied',
    'In Review',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
]
