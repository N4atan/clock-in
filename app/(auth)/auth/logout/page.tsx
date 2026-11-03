"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {

        const handleLogout = async () => {
            try {

                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push('/auth');
                        },
                    },
                });
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
                // Em caso de falha persistente, força o retorno para segurança
                router.push('/auth');
            }
        };

        handleLogout();
    }, [router])

    return (
        <main className="w-full h-[100vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
        </main>
    )
}