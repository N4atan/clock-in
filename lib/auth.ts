import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '../src/db';
import * as authSchema from '../src/db/schemas/auth-schema';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'sqlite',
        schema: {
            ...authSchema,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
    },
    trustedOrigins: ["http://localhost:3000"],
    plugins: [
        nextCookies(),
    ],
});

