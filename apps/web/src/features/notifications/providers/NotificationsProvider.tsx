import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Notification } from '../types/notification.types'
import { getNotifications, markAllAsReadApi } from '../api/notifications.api'

interface NotificationsContextType {
    notifications: Notification[]
    unreadCount: number
    isLoading: boolean
    markAllAsRead: () => Promise<void>
    undoMarkAllRead: () => Promise<void>
    canUndo: boolean
    refresh: () => Promise<void>
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [previousState, setPreviousState] = useState<string | null>(null) // Store as JSON string for deep clone safety

    const fetchNotifications = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getNotifications()
            setNotifications(data)
        } catch (error) {
            console.error('Failed to fetch notifications', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const markAllAsRead = async () => {
        // Capture current state deep copy
        setPreviousState(JSON.stringify(notifications))

        // Optimistic update creating brand new objects
        const newNotifications = notifications.map(n => ({ ...n, isRead: true }))
        setNotifications(newNotifications)

        try {
            await markAllAsReadApi()
        } catch (error) {
            // Rollback if previousState exists
            if (previousState) {
                setNotifications(JSON.parse(previousState))
                setPreviousState(null)
            }
            console.error('Failed to mark all as read', error)
        }
    }

    const undoMarkAllRead = async () => {
        if (previousState) {
            const restoredState = JSON.parse(previousState)
            setNotifications(restoredState)
            setPreviousState(null)
            // Note: In real production we would also call an "undo" API endpoint
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])

    const unreadCount = notifications.filter(n => !n.isRead).length

    return (
        <NotificationsContext.Provider value={{
            notifications,
            unreadCount,
            isLoading,
            markAllAsRead,
            undoMarkAllRead,
            canUndo: previousState !== null,
            refresh: fetchNotifications
        }}>
            {children}
        </NotificationsContext.Provider>
    )
}

export const useNotificationsContext = () => {
    const context = useContext(NotificationsContext)
    if (!context) {
        throw new Error('useNotificationsContext must be used within a NotificationsProvider')
    }
    return context
}
