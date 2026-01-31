import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../../features/auth/pages/LoginPage'
import CreateAccountPage from '../../features/auth/pages/CreateAccountPage'
import RequestCollegeAccessPage from '../../features/auth/pages/RequestCollegeAccessPage'
import { HRDashboardPage } from '../../features/hr-dashboard'
import PlaceholderPage from '../../features/hr-dashboard/pages/PlaceholderPage'
import { JobPostingsPage, CreateJobPage } from '../../features/hr-job-postings'
import { ApplicationsPage } from '../../features/hr-applications'
import { CandidateProfilePage, CandidatesListPage } from '../../features/hr-candidates'
import { InterviewsPage, ScheduleInterviewPage } from '../../features/interviews'
import { EventsPage } from '../../features/events'
import { NotificationsPage } from '../../features/notifications'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/hr-dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/request-college-access" element={<RequestCollegeAccessPage />} />
            <Route path="/hr-dashboard" element={<HRDashboardPage />} />
            <Route path="/hr-dashboard/job-postings" element={<JobPostingsPage />} />
            <Route path="/hr-dashboard/job-postings/create" element={<CreateJobPage />} />
            <Route path="/hr-dashboard/job-postings/:id" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/job-postings/:id/edit" element={<PlaceholderPage />} />
            <Route path="/hr-dashboard/applications" element={<ApplicationsPage />} />
            <Route path="/hr-dashboard/applications/:candidateId" element={<CandidateProfilePage />} />
            <Route path="/hr-dashboard/candidates" element={<CandidatesListPage />} />
            <Route path="/hr-dashboard/interviews" element={<InterviewsPage />} />
            <Route path="/hr-dashboard/interviews/schedule" element={<ScheduleInterviewPage />} />
            <Route path="/hr-dashboard/events" element={<EventsPage />} />
            <Route path="/hr-dashboard/notifications" element={<NotificationsPage />} />
            <Route path="/hr-dashboard/settings" element={<PlaceholderPage />} />
        </Routes>
    )
}

export default AppRoutes
