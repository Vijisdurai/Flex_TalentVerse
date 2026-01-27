import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient, ApiError } from '@/shared/api/client'

// Mock generic fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('apiClient', () => {
    beforeEach(() => {
        mockFetch.mockClear()
        localStorage.clear()
    })

    it('should make a GET request with correct headers', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: 'test' }),
        })

        const response = await apiClient.get('/test')

        expect(mockFetch).toHaveBeenCalledWith('/api/v1/test', expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
            }),
        }))
        expect(response).toEqual({ data: 'test' })
    })

    it('should attach Authorization token if present in localStorage', async () => {
        localStorage.setItem('auth_token', 'fake-token')
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        await apiClient.get('/protected')

        expect(mockFetch).toHaveBeenCalledWith('/api/v1/protected', expect.objectContaining({
            headers: expect.objectContaining({
                'Authorization': 'Bearer fake-token',
            }),
        }))
    })

    it('should handle network errors genericallly', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network failure'))

        await expect(apiClient.get('/network-fail')).rejects.toThrow('Network failure')
    })
})
