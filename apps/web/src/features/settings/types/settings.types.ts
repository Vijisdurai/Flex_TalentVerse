export interface AccountSettings {
    fullName: string
    role: string
    email: string
    avatar: string
}

export interface OrganizationSettings {
    companyName: string
    emailDomain: string
    location: string
    timezone: string
}

export interface SecuritySettings {
    twoFactorEnabled: boolean
    lastLogin: string
}

export interface NotificationPreferences {
    newApplication: boolean
    candidateShortlisted: boolean
    interviewScheduled: boolean
    eventRegistrations: boolean
    systemAnnouncements: boolean
}

export interface DisplaySettings {
    theme: 'light' | 'dark'
    density: 'Comfortable' | 'Compact'
}

export interface SettingsState {
    account: AccountSettings
    organization: OrganizationSettings
    security: SecuritySettings
    notifications: NotificationPreferences
    display: DisplaySettings
}
