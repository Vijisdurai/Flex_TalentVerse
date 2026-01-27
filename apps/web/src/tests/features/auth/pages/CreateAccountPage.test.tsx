import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreateAccountPage from '@/features/auth/pages/CreateAccountPage'
import { authApi } from '@/shared/api/auth'

vi.mock('@/shared/api/auth', () => ({
    authApi: {
        register: vi.fn(),
    },
}))

describe('CreateAccountPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders role selection first', () => {
        render(
            <BrowserRouter>
                <CreateAccountPage />
            </BrowserRouter>
        )
        expect(screen.getByText('Student')).toBeInTheDocument()
        expect(screen.getByText('HR Professional')).toBeInTheDocument()
    })

    it('prevents submission if passwords do not match', async () => {
        render(
            <BrowserRouter>
                <CreateAccountPage />
            </BrowserRouter>
        )

        // Select Role
        fireEvent.click(screen.getByText('Student'))

        // Fill Form
        fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/Create password/i), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), { target: { value: 'mismatch' } })

        // Check Terms
        // Note: The checkbox text might be split, so searched by role or association
        // Assuming label wraps input
        const checkbox = screen.getByRole('checkbox', { name: /i agree to the/i })
        fireEvent.click(checkbox)

        // Submit
        fireEvent.click(screen.getByRole('button', { name: /create account/i }))

        // Expectation: API NOT called
        expect(authApi.register).not.toHaveBeenCalled()
    })

    it('calls authApi.register on valid submission', async () => {
        render(
            <BrowserRouter>
                <CreateAccountPage />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByText('Student'))
        fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/Create password/i), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), { target: { value: 'password123' } })

        const checkbox = screen.getByRole('checkbox', { name: /i agree to the/i })
        fireEvent.click(checkbox)

        fireEvent.click(screen.getByRole('button', { name: /create account/i }))

        await waitFor(() => {
            expect(authApi.register).toHaveBeenCalledWith({
                role: 'student',
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                agreeTerms: true
            })
        })
    })
})
