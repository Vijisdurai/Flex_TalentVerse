import React from 'react'
import HRSidebar from '../components/HRSidebar'
import HRTopBar from '../components/HRTopBar'
import HRWelcomeCard from '../components/HRWelcomeCard'
import HRStatsCards from '../components/HRStatsCards'
import RecentApplicationsTable from '../components/RecentApplicationsTable'
import UpcomingInterviews from '../components/UpcomingInterviews'
import NotificationsPanel from '../components/NotificationsPanel'

const HRDashboardPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <HRSidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HRTopBar />

                <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                        <HRWelcomeCard />

                        <HRStatsCards />

                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            {/* Left Column - Application Table */}
                            <RecentApplicationsTable />

                            {/* Right Column - Side Panels */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <UpcomingInterviews />
                                <NotificationsPanel />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default HRDashboardPage
