"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClockArrowLeftIcon, ClockArrowRightIcon, ForkKnifeCrossed, Lock, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";


import { format, addDays, subDays, getMonth, getDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, getYear, getDaysInMonth, lastDayOfMonth, isBefore, isToday, isAfter, isSameDay } from 'date-fns'
import { authClient } from "@/lib/auth-client";
import { login, register } from "@/actions/userActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function Home() {

    const [viewLogin, setViewLogin] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorFallback, setErrorFallback] = useState<string>('');

    const router = useRouter();


    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorFallback('');

        toast.loading("Logging in...", {
            id: "auth-toast",
        });

        try {
            const formData = new FormData(e.currentTarget);
            const resp = await login(formData);

            if (!resp.success) {
                const errMsg = resp.error || resp.message || 'Failed to login';
                setErrorFallback(errMsg);
                toast.error(errMsg, { id: "auth-toast" });
                return;
            }

            toast.success(resp.message, { id: "auth-toast" });

            router.push('/main');
        } catch (error) {
            console.error(error);
            toast.error('Error logging in', { id: "auth-toast" });
        } finally {
            setLoading(false);
        }
    }

    const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorFallback('');

        toast.loading("Registering...", {
            id: "auth-toast",
        });

        try {
            const formData = new FormData(e.currentTarget);
            const resp = await register(formData);

            if (!resp.success) {
                const errMsg = resp.error || resp.message || 'Failed to register';
                setErrorFallback(errMsg);
                toast.error(errMsg, { id: "auth-toast" });
                return;
            }

            toast.success(resp.message, { id: "auth-toast" });
            
            router.push('/main')
        } catch (error) {
            console.error(error);
            toast.error('Error registering', { id: "auth-toast" });
        } finally {
            setLoading(false);
        }
    }



    return (
        <main className="flex flex-col flex-1 p-4 gap-5">
            <div className="card w-full max-w-sm mx-auto my-10 bg-base-100">
                <div className="card-body">

                    <h1 className="card-title justify-center text-3xl">{viewLogin ? 'Login' : 'Create account'}</h1>

                    <form id="form-auth" className="" onSubmit={viewLogin ? onSubmitLogin : onSubmitRegister}>
                        {!viewLogin && <fieldset className="fieldset">
                            <legend className="fieldset-legend">Username</legend>
                            <label className="input w-full">
                                <User size={18} className="opacity-60 text-base-content" />
                                <input type="text" className="grow" placeholder="@username" name="username" />
                            </label>
                        </fieldset>
                        }

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <label className="input w-full">
                                <Mail size={18} className="opacity-60 text-base-content" />
                                <input type="email" className="grow" placeholder="user@email" name="email" />
                            </label>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <label className="input w-full">
                                <Lock size={18} className="opacity-60 text-base-content" />
                                <input type="password" className="grow" placeholder="Password" name="password" />
                            </label>
                        </fieldset>

                        <div className="divider my-5">
                            <button type="button" className="link " onClick={() => setViewLogin(prev => !prev)}>
                                {viewLogin ? 'Don\'t have an account? Create one' : 'Already have an account? Login'}
                            </button>
                        </div>


                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                viewLogin ? 'Login' : 'Create Account'
                            )}
                        </button>

                        <p className="text-error text-center">{errorFallback}</p>

                    </form>

                </div>
            </div>
        </main>
    );
}
