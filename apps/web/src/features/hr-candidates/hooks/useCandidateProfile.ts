import { useState } from 'react'
import { CandidateProfile, CandidateStatus } from '../types/candidate.types'

const MOCK_CANDIDATE: CandidateProfile = {
    id: 'c-1',
    name: 'Alex Morgan',
    role: 'Senior UX Designer',
    location: 'San Francisco, CA',
    isRemote: true,
    experienceYears: 8,
    avatarUrl: 'https://i.pravatar.cc/150?u=alex', // Using a placeholder for now, or could use local asset
    status: 'Interview',
    items: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'HTML/CSS', 'Agile', 'Leadership'],
    about: 'Alex is a highly experienced UX Designer with a strong background in SaaS product design and design systems. She has led design teams at mid-sized tech companies and is passionate about creating intuitive user flows. Currently seeking a role that balances hands-on design with strategic product thinking.',
    experience: [
        {
            id: 'e-1',
            role: 'Senior Product Designer',
            company: 'Creative Pulse Inc.',
            duration: 'Mar 2021 - Present • 3 yrs 2 mos',
            description: 'Lead designer for the core platform. Managed a team of 3 designers and established the company\'s first design system. Improved user retention by 15% through a complete redesign of the onboarding flow.'
        },
        {
            id: 'e-2',
            role: 'UX Designer',
            company: 'Streamline Tech',
            duration: 'Jun 2018 - Feb 2021 • 2 yrs 9 mos',
            description: 'Collaborated with product managers and engineers to ship 4 major features. Conducted user interviews and usability testing sessions weekly.'
        }
    ],
    education: [
        {
            id: 'ed-1',
            degree: 'BFA in Interaction Design',
            school: 'California College of the Arts',
            year: '2014 - 2018'
        }
    ],
    resumeName: 'Alex_Morgan_Resume.pdf',
    applicationTimeline: [
        { id: 't-1', title: 'Interview Scheduled', date: 'Today, 10:30 AM', description: 'Technical round with Lead Eng.', status: 'Interview' },
        { id: 't-2', title: 'Screening Call', date: 'May 12, 2:00 PM', description: 'Passed initial HR screening.', status: 'Shortlisted' },
        { id: 't-3', title: 'Application Received', date: 'May 10, 9:15 AM', description: 'Applied via LinkedIn integration.', status: 'Applied' }
    ],
    notes: 'Strong portfolio. Good communication skills during screening. Salary expectations are within budget.', // Initial mock note
    previousStatus: undefined
}

export const useCandidateProfile = (_candidateId: string) => {
    // In a real app, we would fetch based on ID. Here we just use the mock.
    const [candidate, setCandidate] = useState<CandidateProfile>(MOCK_CANDIDATE)

    // Status Update Logic (Mock)
    const updateStatus = (newStatus: CandidateStatus) => {
        setCandidate(prev => {
            // If rejecting, save current status as previous
            const previousStatus = newStatus === 'Rejected' ? prev.status : undefined

            return {
                ...prev,
                status: newStatus,
                previousStatus: previousStatus, // Store for undo
                // Add a timeline event for the status change
                applicationTimeline: [
                    {
                        id: `t-${Date.now()}`,
                        title: `Status Updated to ${newStatus}`,
                        date: 'Just now',
                        description: 'Manual update by HR',
                        status: newStatus
                    },
                    ...prev.applicationTimeline
                ]
            }
        })
    }

    // Undo Rejection
    const undoReject = () => {
        setCandidate(prev => {
            if (!prev.previousStatus) return prev // Safety check

            return {
                ...prev,
                status: prev.previousStatus, // Revert
                previousStatus: undefined, // Clear history
                applicationTimeline: [
                    {
                        id: `t-${Date.now()}-undo`,
                        title: `Rejection Reverted`,
                        date: 'Just now',
                        description: 'Restored previous status',
                        status: prev.previousStatus
                    },
                    ...prev.applicationTimeline
                ]
            }
        })
    }

    // Notes Save Logic (Mock)
    const saveNote = (newNote: string) => {
        setCandidate(prev => ({ ...prev, notes: newNote }))
        // In real app, API call here
    }

    // Resume Download (Mock)
    const downloadResume = () => {
        alert(`Downloading ${candidate.resumeName}...`)
    }

    return {
        candidate,
        updateStatus,
        undoReject,
        saveNote,
        downloadResume
    }
}
