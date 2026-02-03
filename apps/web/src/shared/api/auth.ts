import { apiClient } from './client';

// --- Types ---

// Login
export interface LoginRequest {
    email: string;
    password: string;
    userType: 'student' | 'professional';
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: 'student' | 'hr' | 'college_admin' | 'super_admin';
    };
}

// Registration
export interface RegisterRequest {
    role: 'student' | 'hr';
    fullName: string;
    email: string;
    password: string;
    agreeTerms: boolean;
}

export interface RegisterResponse {
    message: string;
    userId: string;
}

// College Access Request
export interface CollegeAccessRequest {
    collegeName: string;
    collegeAddress: string;
    adminName: string;
    officialEmail: string;
    contactNumber: string;
}

export interface CollegeAccessResponse {
    message: string;
    requestId: string;
}

// Google Login
export interface GoogleLoginRequest {
    credential: string;
}

// Google Registration
export interface GoogleRegisterRequest {
    credential: string;
}

export interface GoogleRegisterResponse {
    message: string;
    userId: number;
}

// --- API Service ---

export const authApi = {
    login: (data: LoginRequest) => {
        return apiClient.post<LoginResponse>('/auth/login', data);
    },

    googleLogin: (data: GoogleLoginRequest) => {
        return apiClient.post<LoginResponse>('/auth/login/google', data);
    },

    register: (data: RegisterRequest) => {
        return apiClient.post<RegisterResponse>('/auth/register', data);
    },

    googleRegister: (data: GoogleRegisterRequest) => {
        return apiClient.post<GoogleRegisterResponse>('/auth/register/google', data);
    },

    requestCollegeAccess: (data: CollegeAccessRequest) => {
        return apiClient.post<CollegeAccessResponse>('/auth/college-access', data);
    },

    // Example of a utility method that might be needed later
    logout: () => {
        // If the backend has a logout endpoint (e.g. to invalidate cookie sessions)
        // return apiClient.post('/auth/logout');

        // For JWT only, client-side clearance is often enough, but standardized endpoint is better.
        // We will assume backend might want to know for audit logs.
        // Returning a resolved promise for now as placeholder if no endpoint exists yet.
        return Promise.resolve();
    }
};
