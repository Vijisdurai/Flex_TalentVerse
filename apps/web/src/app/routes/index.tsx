import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../../features/landing/LandingPage'
import LoginPage from '../../features/auth/pages/LoginPage'
import CreateAccountPage from '../../features/auth/pages/CreateAccountPage'
import RequestCollegeAccessPage from '../../features/auth/pages/RequestCollegeAccessPage'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/create-account" element={<CreateAccountPage />} />
            <Route path="/auth/request-college-access" element={<RequestCollegeAccessPage />} />
            {/* Legacy redirects */}
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/create-account" element={<Navigate to="/auth/create-account" replace />} />
            <Route path="/request-college-access" element={<Navigate to="/auth/request-college-access" replace />} />
        </Routes>
    )
}

export default AppRoutes

