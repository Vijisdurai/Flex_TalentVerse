import { useState, useCallback } from 'react'
import { SettingsState } from '../types/settings.types'

const INITIAL_STATE: SettingsState = {
    account: {
        fullName: 'Sarah Miller',
        role: 'HR Manager',
        email: 'sarah.miller@flextalent.com',
        avatar: ''
    },
    organization: {
        companyName: 'FlexTalent Inc.',
        emailDomain: '@flextalent.com',
        location: 'San Francisco, CA',
        timezone: '(GMT-08:00) Pacific Time (US & Canada)'
    },
    security: {
        twoFactorEnabled: false,
        lastLogin: 'San Francisco, US Today at 9:41 AM'
    },
    notifications: {
        newApplication: true,
        candidateShortlisted: true,
        interviewScheduled: true,
        eventRegistrations: false,
        systemAnnouncements: true
    },
    display: {
        theme: 'light',
        density: 'Comfortable'
    }
}

export const useSettings = () => {
    const [settings, setSettings] = useState<SettingsState>(INITIAL_STATE)

    const updateAccount = useCallback((data: Partial<SettingsState['account']>) => {
        setSettings(prev => ({ ...prev, account: { ...prev.account, ...data } }))
    }, [])

    const updateOrganization = useCallback((data: Partial<SettingsState['organization']>) => {
        setSettings(prev => ({ ...prev, organization: { ...prev.organization, ...data } }))
    }, [])

    const updateSecurity = useCallback((data: Partial<SettingsState['security']>) => {
        setSettings(prev => ({ ...prev, security: { ...prev.security, ...data } }))
    }, [])

    const updateNotifications = useCallback((data: Partial<SettingsState['notifications']>) => {
        setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, ...data } }))
    }, [])

    const updateDisplay = useCallback((data: Partial<SettingsState['display']>) => {
        setSettings(prev => ({ ...prev, display: { ...prev.display, ...data } }))
    }, [])

    return {
        settings,
        updateAccount,
        updateOrganization,
        updateSecurity,
        updateNotifications,
        updateDisplay
    }
}
