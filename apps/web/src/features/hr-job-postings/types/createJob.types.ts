export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance' | ''
export type LocationType = 'Remote' | 'Onsite' | 'Hybrid' | ''
export type Currency = 'USD ($)' | 'EUR (€)' | 'GBP (£)' | 'INR (₹)' | 'CAD ($)'

export interface CreateJobFormState {
    title: string
    employmentType: EmploymentType
    locationType: LocationType
    location: string
    description: string
    requirements: string
    salaryMin: string
    salaryMax: string
    currency: Currency
}

export interface CreateJobFormErrors {
    title?: string
    employmentType?: string
    location?: string
    description?: string
    requirements?: string
}
