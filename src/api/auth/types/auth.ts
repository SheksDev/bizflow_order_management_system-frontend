
export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    createdAt?: string;
}

export interface LoginData {
    accessToken: string;
    user: User;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}

export interface LoginErrors {
    email?: string;
    password?: string;
}