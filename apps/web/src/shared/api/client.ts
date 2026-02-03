/**
 * Shared API Client
 * 
 * A wrapper around the native fetch API to standardize request handling,
 * error parsing, and authorization headers.
 */

const API_BASE_URL = '/api/v1';

export class ApiError extends Error {
    public readonly __isApiError = true;

    constructor(
        public message: string,
        public status: number,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...customOptions } = options;

    // Handle Query Parameters
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    // Handle Headers (Auth + Content-Type)
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('auth_token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...customOptions,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    try {
        const response = await fetch(url, config);

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new ApiError(
                data.detail || data.message || 'An error occurred while fetching data',
                response.status,
                data
            );
        }

        return data as T;
    } catch (error) {
        console.log('Caught error in client:', error);
        console.log('Is ApiError?', error instanceof ApiError);
        console.log('Has flag?', (error as any).__isApiError);

        // Robust check for ApiError to handle potential instance issues in tests
        if (error instanceof ApiError || (error as any).__isApiError) {
            throw error;
        }
        // Handle network errors or JSON parsing errors
        throw new ApiError(
            error instanceof Error ? error.message : 'Network Error',
            500
        );
    }
}

export const apiClient = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),

    put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),

    patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
