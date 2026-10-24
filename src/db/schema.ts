import { sqliteTable, text, real, integer, int } from 'drizzle-orm/sqlite-core';

// npx drizzle-kit generate
// npx dizzle-kit migrate


export const users = sqliteTable('users', {
    id: int('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
});