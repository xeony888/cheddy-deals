"use client"
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeComponent({ username }: { username: string }) {
    const r = useRouter();
    const [loading, setLoading] = useState(false);
    async function onSubmit() {
        setLoading(true);
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            r.replace("/login");
        } else {
            const data = await res.json().catch(() => ({}));
            console.error(data)
        }
        setLoading(false);
    }
    return (
        <main className="min-h-screen grid place-items-center p-10">
            <h1 className="text-3xl font-bold">Welcome, {username}</h1>
            <button
                onClick={onSubmit}
                className={
                    clsx(
                        "w-full h-11 bg-black text-white rounded hover:opacity-90",
                        loading && "opacity-60 cursor-not-allowed"
                    )}
            >
                {loading ? "Logging Out..." : "Log Out"}
            </button>
        </main>
    );
}