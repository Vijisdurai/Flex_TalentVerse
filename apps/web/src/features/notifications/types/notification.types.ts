export type NotificationCategory = 'Today' | 'Yesterday' | 'Earlier'

export interface Notification {
    id: string
    category: NotificationCategory
    title: string
    description: string
    timestamp: string
    isRead: boolean
    actionLink?: string
    actionLabel?: string
}
