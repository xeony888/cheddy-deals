"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";


export default function LoginPage() {
    const r = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError(null);
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            r.replace("/");
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Login failed");
        }
        setLoading(false);
    }


    return (
        <main className="min-h-screen grid md:grid-cols-2" >
            {/* Left split */}
            < section className="hidden md:flex flex-col justify-between bg-[#EDF0F3] p-10" >
                <div />
                < div >
                    <div className="font-extrabold italic text-5xl tracking-tight select-none" >
                        <span className="border-b-8 border-black pb-1" > CHEDDY </span>
                    </div>
                    <p className="mt-4 font-mono text-[#6b7280]" > Campaign Reporting </p>
                </div>
                <div className="h-6" />
            </section>


            {/* Right split */}
            <section className="flex items-center justify-center p-6" >
                <div className="w-full max-w-xl rounded border border-neutral-200 bg-[#F6F8FA] p-8 shadow-sm" >
                    <h2 className="font-mono text-2xl mb-6" > ADMIN LOGIN </h2>
                    <form onSubmit={onSubmit} className="space-y-5" >
                        <div>
                            <label className="block text-sm font-medium mb-2" > USERNAME </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)
                                }
                                placeholder="Enter username"
                                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" > PASSWORD </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-black"
                            />
                        </div>
                        {
                            error && (
                                <p className="text-sm text-red-600" > {error} </p>
                            )
                        }
                        <button
                            type="submit"
                            disabled={loading}
                            className={
                                clsx(
                                    "w-full h-11 bg-black text-white rounded hover:opacity-90",
                                    loading && "opacity-60 cursor-not-allowed"
                                )}
                        >
                            {loading ? "LOGGING IN…" : "LOGIN"}
                        </button>
                    </form>
                    <a href="/register" className="mt-8 text-xs text-gray-500 font-mono hover:underline text-center" >
                        Register Now
                    </a>
                    <p className="mt-8 text-center text-xs text-gray-500 font-mono" >
                        Admin credentials required for access
                    </p>
                </div>
            </section>
        </main>
    );
}