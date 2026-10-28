'use server';


import { auth } from '@/lib/auth';

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    code?: number;
    error?: string;
}



export async function login(formData: FormData): Promise<ApiResponse<any>> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
        const response = await auth.api.signInEmail({
            body: {
                email, password
            }
        })

        return {
            success: true,
            message: 'Logged in successfully!',
            data: response.user,
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message || 'Error logging in',
                error: error.message,
            }
        }
        return {
            data: [],
            success: false,
            message: 'Unknown error',
        }
    }
}

export async function register(formData: FormData): Promise<ApiResponse<any>> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    try {
        const response = await auth.api.signUpEmail({
            body: {
                email, 
                password, 
                name: username
            }
        })

        await auth.api.signInEmail({
            body: {
                email, password
            }
        })

        return {
            success: true,
            message: 'User registered and logged in successfully!',
            data: response.user,
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message || 'Error registering user',
                error: error.message,
            }
        }
        return {
            success: false,
            message: 'Unknown error',
        }
    }
}