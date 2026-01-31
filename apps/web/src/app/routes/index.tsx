import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../../features/auth/pages/LoginPage'
import CreateAccountPage from '../../features/auth/pages/CreateAccountPage'
import RequestCollegeAccessPage from '../../features/auth/pages/RequestCollegeAccessPage'
import { HRDashboardPage } from '../../features/hr-dashboard'
import PlaceholderPage from '../../features/hr-dashboard/pages/PlaceholderPage'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/hr-dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/request-college-access" element={<RequestCollegeAccessPage />} />
            <Route path="/hr-dashboard" element={<HRDashboardPage />} />
            <Route path="/hr-dashboard/job-postings" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/applications/*" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/candidates" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/interviews/*" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/events" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/notifications" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/settings" element={<PlaceholderPage />} />
        </Routes>
    )
}

export default AppRoutes
