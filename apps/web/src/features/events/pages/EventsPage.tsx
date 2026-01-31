import React, { useState } from 'react'
import { useTheme } from '../../../shared/providers/ThemeContext'
import HRSidebar from '../../hr-dashboard/components/HRSidebar'
import HRTopBar from '../../hr-dashboard/components/HRTopBar'
import { useEvents } from '../hooks/useEvents'
import { EventStatus, EventType } from '../types/event.types'

// Components
import EventFilters from '../components/EventFilters'
import EventCard from '../components/EventCard'

const EventsPage: React.FC = () => {
    const { theme } = useTheme()
    const { events, isLoading } = useEvents()
    const isDark = theme === 'dark'

    // Filter & Sort State
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState<EventType | 'All'>('All')
    const [statusFilter, setStatusFilter] = useState<EventStatus | 'All'>('All')
    const [sortBy, setSortBy] = useState<'Upcoming' | 'Recent'>('Upcoming')

    // Logic
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === 'All' || event.type === typeFilter
        const matchesStatus = statusFilter === 'All' || event.status === statusFilter
        return matchesSearch && matchesType && matchesStatus
    }).sort((a, b) => {
        if (sortBy === 'Upcoming') {
            // Sort by date ascending (soonest first)
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        } else {
            // Sort by date descending (newest/most recent first) - though for "Upcoming events" this might be semantic, usually "Recent" implies created recently or recently happened. 
            // Assuming "Recent" means reversed time.
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
    })

    // Styles
    const pageBg = isDark ? '#1F2937' : '#F9FAFB'
    const textMain = isDark ? '#F9FAFB' : '#262626'

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: pageBg }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h1 style={{
                                fontSize: '28px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                                color: textMain, margin: '0 0 4px 0'
                            }}>
                                Events
                            </h1>
                            <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', fontFamily: 'Century Gothic, sans-serif' }}>
                                Manage and track all recruitment events
                            </p>
                        </div>
                        <button style={{
                            padding: '10px 20px', borderRadius: '8px', border: 'none',
                            backgroundColor: '#009ADD', color: '#FFFFFF', fontWeight: 600,
                            fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            + Create Event
                        </button>
                    </div>

                    {/* Filters */}
                    <div style={{ marginBottom: '32px' }}>
                        <EventFilters
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            typeFilter={typeFilter}
                            onTypeChange={setTypeFilter}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />
                    </div>

                    {/* Events List */}
                    {isLoading ? (
                        <div style={{ color: textMain }}>Loading events...</div>
                    ) : (
                        <div>
                            {filteredEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}

                            {filteredEvents.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                                    No events found matching your filters.
                                </div>
                            )}
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default EventsPage
