'use server';


import { db } from '@/src/db';
import { users  } from '@/src/db/schema';
import { revalidatePath } from 'next/cache';

export type User = {
    id: number;
    name: string;
    email: string;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    code?: number;
    error?: string;
}

export async function postUser(name: string, email: string): Promise<ApiResponse<User>> {
    try {
        const value: typeof users.$inferInsert = {
            name,
            email,
        };
        
        const [createdUser] = await db.insert(users).values(value).returning();
        revalidatePath('/');
        
        return {
            success: true,
            message: "User created successfully",
            data: createdUser,
            code: 200,
        }

    } catch (e) {
        console.error("Error in postUser: ", e);
        
        return {
            success: false,
            message: "Failed to create user",
            code: 500,
            error: `${e}` || 'Unknown error'
        }
    }
}