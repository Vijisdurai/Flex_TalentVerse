import { useState, useEffect } from 'react'
import { RecruitmentEvent } from '../types/event.types'
import { getEvents } from '../api/events.api'

export const useEvents = () => {
    const [events, setEvents] = useState<RecruitmentEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            const data = await getEvents()
            setEvents(data)
        } catch (error) {
            console.error('Failed to fetch events', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return {
        events,
        isLoading,
        refresh: fetchEvents
    }
}
