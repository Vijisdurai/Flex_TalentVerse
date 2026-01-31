import { JobPosting } from '../types/jobPosting.types'

export const useJobPostings = () => {
    const jobs: JobPosting[] = [
        {
            id: '1',
            title: 'Senior Full Stack Developer',
            status: 'Active',
            type: 'Full-time',
            location: 'Remote',
            postedAt: 'Posted 2 days ago',
            stats: {
                applications: 45,
                views: 182
            }
        },
        {
            id: '2',
            title: 'Product Design Intern',
            status: 'Active',
            type: 'Internship',
            location: 'Hybrid',
            postedAt: 'Posted 5 days ago',
            stats: {
                applications: 12,
                views: 86
            }
        },
        {
            id: '3',
            title: 'Marketing Specialist',
            status: 'Closed',
            type: 'Full-time',
            location: 'Onsite',
            postedAt: 'Posted 1 week ago',
            stats: {
                applications: 128,
                views: 410
            }
        },
        {
            id: '4',
            title: 'Data Analyst',
            status: 'Draft',
            type: 'Full-time',
            location: 'Remote',
            postedAt: 'Edited 2 hours ago',
            stats: {
                applications: 0,
                views: 0
            }
        }
    ]

    return { jobs }
}
