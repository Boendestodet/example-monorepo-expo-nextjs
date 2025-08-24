import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { saveToken, clearToken, getToken } from "../lib/auth";

type User = { id: number; email: string; name?: string | null };

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        try {
            const data = await apiFetch("/api/auth/me");
            setUser(data.user ?? null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email: string, password: string) {
        const data = await apiFetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        if (data?.token) await saveToken(data.token);
        await refresh();
    }

    async function register(email: string, password: string, name?: string) {
        const data = await apiFetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
        });
        if (data?.token) await saveToken(data.token);
        await refresh();
    }

    async function logout() {
        try { await apiFetch("/api/auth/logout", { method: "POST" }); } catch { }
        await clearToken();
        setUser(null);
    }

    useEffect(() => {
        // Om token finns—läs in aktuell användare
        getToken().then(t => (t ? refresh() : setLoading(false)));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}