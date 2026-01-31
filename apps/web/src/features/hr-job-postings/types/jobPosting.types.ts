export type JobStatus = 'Active' | 'Closed' | 'Draft'
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
export type LocationType = 'Remote' | 'Onsite' | 'Hybrid'

export interface JobStats {
    applications: number
    views: number
}

export interface JobPosting {
    id: string
    title: string
    status: JobStatus
    type: JobType
    location: LocationType
    postedAt: string
    stats: JobStats
}
