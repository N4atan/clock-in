import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { user } from './auth-schema';
import { sql } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mssql-core';

export * from './auth-schema';


export const time_entries = sqliteTable("time_entries", {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
    type: text({ enum: ["CLOCK_IN","BREAK_OUT","BREAK_IN","CLOCK_OUT"] }).notNull(),
    timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
})