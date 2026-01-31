import { useState, useEffect } from 'react'
import { Interview } from '../types/interview.types'
import { getInterviews } from '../api/interviews.api'

export const useInterviews = () => {
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchInterviews = async () => {
        setIsLoading(true)
        try {
            const data = await getInterviews()
            setInterviews(data)
        } catch (error) {
            console.error('Failed to fetch interviews', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchInterviews()
    }, [])

    // Grouping Logic (Mocking dates relative to the "Today" in mock data 2026-10-24)
    // In a real app we would use actual Date comparisons.
    const liveInterview = interviews.find(i => i.isLive)
    const todayInterviews = interviews.filter(i => i.date === '2026-10-24' && !i.isLive)
    const tomorrowInterviews = interviews.filter(i => i.date === '2026-10-25')

    return {
        interviews,
        liveInterview,
        todayInterviews,
        tomorrowInterviews,
        isLoading,
        refresh: fetchInterviews
    }
}
