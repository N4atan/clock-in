"use server";

import { db } from "@/src/db";
import { time_entries } from "@/src/db/schemas/schema";
import { ApiResponse } from "./userActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export enum typeTimeEntries {
    "CLOCK_IN" = "CLOCK_IN",
    "BREAK_OUT" = "BREAK_OUT",
    "BREAK_IN" = "BREAK_IN",
    "CLOCK_OUT" = "CLOCK_OUT",
}


export type TimeEntries = typeof time_entries.$inferInsert | typeof time_entries.$inferSelect;


export async function getAllTimeEntries(): Promise<ApiResponse<TimeEntries[]>> {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user) {
            return {
                data: [],
                message: 'No Active Session Found',
                success: false,
            }
        }

        const data = await db
            .select()
            .from(time_entries)
            .where(eq(time_entries.user_id, session.user.id));

        return {
            data,
            message: 'Success on loading time entries',
            success: true,
        }

    } catch (error) {
        return {
            data: [],
            message: 'Unknown Error',
            success: false,
            error: JSON.stringify(error)
        }
    }
}

export async function postTimeEntrie(type: "CLOCK_IN" | "BREAK_OUT" | "BREAK_IN" | "CLOCK_OUT"): Promise<ApiResponse<TimeEntries | null>> {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user) {
            return {
                data: null,
                message: 'No Active Session Found',
                success: false,
            }
        }

        const time_entrie = {
            id: crypto.randomUUID(),
            user_id: session.user.id,
            type,
            timestamp: new Date()
        }

        const data = await db
            .insert(time_entries)
            .values(time_entrie)

        return {
            data: time_entrie,
            message: 'Success on loading time entries',
            success: true,
        }

    } catch (error) {
        return {
            data: null,
            message: 'Unknown Error',
            success: false,
            error: JSON.stringify(error)
        }
    }
}