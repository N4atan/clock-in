"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { user as userSchema } from "@/src/db/schemas/auth-schema";
import { time_entries } from "@/src/db/schemas/schema";
import { ApiResponse } from "@/actions/userActions";
import { getAllTimeEntries, postTimeEntrie, TimeEntries } from "@/actions/timeEntriesAction";
import toast from "react-hot-toast";



interface DataContextType {
    timeEntries: typeof time_entries.$inferSelect[] | null;
    setTimeEntries: (timeEntries: typeof time_entries.$inferSelect[] | null) => void;
    clockInRegister: () => void;
    clockOutRegister: () => void, 
    breaktimeStartRegister: () => void, 
    breaktimeEndRegister: () => void,
}

const DataContext = createContext<DataContextType | null>(null);


export function DataProvider({ children }: { children: React.ReactNode }) {
    const [ timeEntries, setTimeEntries ] = useState<typeof time_entries.$inferSelect[] | null>(null);

    const loadTimeEntries = async () => {
        toast.loading('Loading Time Entries...', { id: 'loading-time-entries' });

        const data: ApiResponse<TimeEntries[]> = await getAllTimeEntries();

        if (!data.success) {
            toast.dismiss('loading-time-entries');
            toast.error(data.message)
            console.error(data.error || data.message);
            return;
        }

        toast.dismiss('loading-time-entries');
        toast.success(data.message);
        setTimeEntries(data.data || []);
    }
    
    useEffect(() => {
        loadTimeEntries();
    }, [])

    const clockInRegister= async () => {
        if (!window.confirm("Are you sure?")) return;

        toast.loading('Saving clock in', {
            id: 'loading-clockin-register'
        });

        const data = await postTimeEntrie("CLOCK_IN");

        if (!data.success) {
            toast.error(data.message, {
            id: 'loading-clockin-register'
        })
            console.error(data.error || data.message);
            return;
        }

        toast.success("Clock in saved!", {
            id: 'loading-clockin-register'
        });
        
        loadTimeEntries();
    }

    const clockOutRegister= async () => {
        if (!window.confirm("Are you sure?")) return;

        toast.loading('Saving breaktime start', {
            id: 'loading-clockout-register'
        });

        const data = await postTimeEntrie("CLOCK_OUT");

        if (!data.success) {
            toast.error(data.message, {
            id: 'loading-clockout-register'
        })
            console.error(data.error || data.message);
            return;
        }

        toast.success("Breaktime start saved!", {
            id: 'loading-clockout-register'
        });
        
        loadTimeEntries();
    }

    const breaktimeStartRegister= async () => {
        if (!window.confirm("Are you sure?")) return;

        toast.loading('breaktime start', {
            id: 'breaktime-start-register'
        });

        const data = await postTimeEntrie('BREAK_IN');

        if (!data.success) {
            toast.error(data.message, {
            id: 'breaktime-start-register'
        })
            console.error(data.error || data.message);
            return;
        }

        toast.success("Clock in saved!", {
            id: 'breaktime-start-register'
        });
        
        loadTimeEntries();
    }

    const breaktimeEndRegister= async () => {
        if (!window.confirm("Are you sure?")) return;

        toast.loading('Saving breaktime end', {
            id: 'breaktime-end-register'
        });

        const data = await postTimeEntrie('BREAK_OUT');

        if (!data.success) {
            toast.error(data.message, {
            id: 'breaktime-end-register'
        })
            console.error(data.error || data.message);
            return;
        }

        toast.success("Breaktime end saved!", {
            id: 'breaktime-end-register'
        });
        
        loadTimeEntries();
    }

    return (
        <DataContext value={{ timeEntries, setTimeEntries, clockInRegister, clockOutRegister, breaktimeStartRegister, breaktimeEndRegister }}>
            {children}
        </DataContext>
    )
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within DataProvider");
    }
    return context;
}