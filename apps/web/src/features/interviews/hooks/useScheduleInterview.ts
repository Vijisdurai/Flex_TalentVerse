import { useState } from 'react'
import { CreateInterviewPayload, InterviewType } from '../types/interview.types'
import { createInterview } from '../api/interviews.api'

export const useScheduleInterview = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const schedule = async (payload: CreateInterviewPayload) => {
        setIsSubmitting(true)
        setError(null)
        try {
            await createInterview(payload)
            return true
        } catch (err) {
            setError('Failed to schedule interview')
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        schedule,
        isSubmitting,
        error
    }
}
