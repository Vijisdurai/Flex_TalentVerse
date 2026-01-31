import { useNotificationsContext } from '../providers/NotificationsProvider'

export const useNotifications = () => {
    const { notifications, unreadCount, isLoading, markAllAsRead, undoMarkAllRead, canUndo, refresh } = useNotificationsContext()

    // Grouping logic remains here for UI convenience
    const grouped = {
        Today: notifications.filter(n => n.category === 'Today'),
        Yesterday: notifications.filter(n => n.category === 'Yesterday'),
        Earlier: notifications.filter(n => n.category === 'Earlier')
    }

    return {
        groupedNotifications: grouped,
        unreadCount,
        isLoading,
        markAllAsRead,
        undoMarkAllRead,
        canUndo,
        refresh
    }
}
