import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../../features/auth/pages/LoginPage'
import CreateAccountPage from '../../features/auth/pages/CreateAccountPage'
import RequestCollegeAccessPage from '../../features/auth/pages/RequestCollegeAccessPage'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/request-college-access" element={<RequestCollegeAccessPage />} />
        </Routes>
    )
}

export default AppRoutes
