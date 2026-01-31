import { useState } from 'react'
import { CreateJobFormState, EmploymentType, LocationType, Currency } from '../types/createJob.types'

const INITIAL_STATE: CreateJobFormState = {
    title: '',
    employmentType: '',
    locationType: 'Remote',
    location: '',
    description: '',
    requirements: '- ',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD ($)'
}

export const useCreateJobForm = () => {
    const [formState, setFormState] = useState<CreateJobFormState>(INITIAL_STATE)

    const handleChange = (field: keyof CreateJobFormState, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }))
    }

    const handleSalaryChange = (type: 'min' | 'max', value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return

        if (type === 'min') {
            handleChange('salaryMin', value)
        } else {
            handleChange('salaryMax', value)
        }
    }

    return {
        formState,
        handleChange,
        handleSalaryChange,
        setFormState
    }
}
