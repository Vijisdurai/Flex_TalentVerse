import { Interview, CreateInterviewPayload } from '../types/interview.types'

// Mock Data
const MOCK_INTERVIEWS: Interview[] = [
    {
        id: 'i-1',
        candidateId: 'c-101',
        candidateName: 'Jessica Parker',
        candidateRole: 'Senior Product Manager',
        date: '2026-10-24', // "Today" mock
        startTime: '10:30',
        endTime: '11:30',
        durationMinutes: 60,
        platform: 'Google Meet',
        link: 'https://meet.google.com/abc-defg-hij',
        status: 'Live',
        type: 'Final Round' as any, // keeping generic string for flexibility if needed, or strictly typed
        interviewers: [{ id: 'u-1', name: 'Alex Johnson' }],
        isLive: true
    },
    {
        id: 'i-2',
        candidateId: 'c-102',
        candidateName: 'David Chen',
        candidateRole: 'Frontend Developer',
        date: '2026-10-24',
        startTime: '14:00',
        endTime: '15:00',
        durationMinutes: 60,
        platform: 'Zoom',
        link: 'https://zoom.us/j/123456789',
        status: 'Confirmed',
        type: 'Technical',
        interviewers: [{ id: 'u-2', name: 'Sarah Lee' }]
    },
    {
        id: 'i-3',
        candidateId: 'c-103',
        candidateName: 'Sarah Miller',
        candidateRole: 'UX Designer',
        date: '2026-10-24',
        startTime: '16:15',
        endTime: '17:00',
        durationMinutes: 45,
        platform: 'In-Person',
        location: 'Office - Room 3B',
        status: 'Scheduled',
        type: 'Behavioral',
        interviewers: [{ id: 'u-3', name: 'Mike Ross' }]
    },
    {
        id: 'i-4',
        candidateId: 'c-104',
        candidateName: 'Robert Fox',
        candidateRole: 'Engineering Manager',
        date: '2026-10-24',
        startTime: '17:30',
        endTime: '18:30',
        durationMinutes: 60,
        platform: 'Teams',
        link: 'https://teams.microsoft.com/meet/xyz',
        status: 'Confirmed',
        type: 'Culture Fit',
        interviewers: [{ id: 'u-1', name: 'Alex Johnson' }]
    },
    {
        id: 'i-5',
        candidateId: 'c-105',
        candidateName: 'Mei Lin',
        candidateRole: 'Data Scientist',
        date: '2026-10-25', // Tomorrow
        startTime: '10:00',
        endTime: '11:00',
        durationMinutes: 60,
        platform: 'Zoom',
        link: 'https://zoom.us/j/987654321',
        status: 'Scheduled',
        type: 'Technical',
        interviewers: [{ id: 'u-4', name: 'Emily Chen' }]
    },
    {
        id: 'i-6',
        candidateId: 'c-106',
        candidateName: 'Arjun Patel',
        candidateRole: 'Backend Developer',
        date: '2026-10-25',
        startTime: '13:30',
        endTime: '14:00',
        durationMinutes: 30,
        platform: 'Google Meet',
        link: 'https://meet.google.com/xyz-uvw-rst',
        status: 'Scheduled',
        type: 'Screening',
        interviewers: [{ id: 'u-5', name: 'David Kim' }]
    }
]

// API Functions
export const getInterviews = async (): Promise<Interview[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_INTERVIEWS])
        }, 500)
    })
}

export const createInterview = async (payload: CreateInterviewPayload): Promise<Interview> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newInterview: Interview = {
                id: `i-${Date.now()}`,
                candidateId: payload.candidateId,
                candidateName: payload.candidateName,
                candidateRole: 'Applicant', // Default for mock
                date: payload.date,
                startTime: payload.startTime,
                endTime: '00:00', // would calculate based on duration
                durationMinutes: payload.duration,
                platform: payload.platform as any,
                status: 'Scheduled',
                type: payload.type,
                interviewers: payload.interviewers.map(id => ({ id, name: 'Interviewer' })), // Mock lookup
                notes: payload.notes
            }
            MOCK_INTERVIEWS.push(newInterview)
            resolve(newInterview)
        }, 800)
    })
}
