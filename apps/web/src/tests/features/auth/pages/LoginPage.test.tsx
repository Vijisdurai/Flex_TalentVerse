import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import { authApi } from '@/shared/api/auth'

// Mock authApi
vi.mock('@/shared/api/auth', () => ({
    authApi: {
        login: vi.fn(),
    },
}))

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders login form elements', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        expect(screen.getByPlaceholderText(/you@company.com/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })

    it('calls authApi.login on form submission', async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'secret' } })

        fireEvent.click(screen.getByRole('button', { name: /log in/i })).click

        await waitFor(() => {
            expect(authApi.login).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'secret',
            })
        })
    })

    it('displays error message on login failure', async () => {
        const errorMessage = 'Invalid credentials'
        vi.mocked(authApi.login).mockRejectedValueOnce(new Error(errorMessage))

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        fireEvent.change(screen.getByPlaceholderText(/you@company.com/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'wrong' } })

        fireEvent.click(screen.getByRole('button', { name: /log in/i }))

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        })
    })
})
