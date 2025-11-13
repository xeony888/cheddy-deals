"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { CampaignAndDeliverables } from "@/lib/types";


export default function HomeComponent(props: {
    username: string;
    page: number;
    totalPages: number;
    filter: "active" | "completed" | "all";
    cards: CampaignAndDeliverables[];
}) {
    const { username, page, totalPages, filter, cards } = props;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function push(params: Record<string, string>) {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
        router.replace(url.pathname + "?" + url.searchParams.toString());
    }
    function setFilter(nextFilter: "active" | "all" | "completed") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", nextFilter);
        params.set("page", "1"); // reset to first page on filter change

        router.replace(`${pathname}?${params.toString()}`);
    }
    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/login");
    }

    return (
        <main className="min-h-screen">
            {/* Top bar */}
            <header className="flex items-center justify-between px-5 py-3 border-b">
                <div className="flex items-center gap-3">
                    <div className="font-extrabold italic text-2xl select-none">
                        <span className="border-b-8 border-black pb-1">CHEDDY</span>
                    </div>
                    <span className="ml-2 text-xs px-2 py-1 border rounded bg-white">ADMIN</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/admin")}
                        className="text-xs border px-3 py-2 rounded"
                    >
                        ADMIN PANEL
                    </button>
                    <button onClick={logout} className="text-xs border px-3 py-2 rounded">
                        LOGOUT
                    </button>
                </div>
            </header>

            <section className="px-6 pt-6">
                <div className="text-sm font-mono mb-3">FILTERS:</div>
                <div className="flex items-center gap-2">
                    {(["active", "all", "completed"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx(
                                "text-xs px-3 py-1 rounded border hover:bg-black hover:text-white hover:cursor-pointer",
                                f === filter ? "bg-black text-white" : "bg-white"
                            )}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6 px-6 py-6">
                {cards.map((c) => {
                    const done = c.deliverables.length;
                    const target = Math.max(1, c.deliverableTarget);
                    const pct = Math.min(100, Math.round((done / target) * 100));
                    const completed = done >= target;

                    return (
                        <article
                            key={c.id}
                            className="rounded border bg-[#F6F8FA] p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="font-mono font-bold tracking-widest">{c.name}</h3>
                                <div className="text-xs text-gray-500">
                                    Started: {c.startDate.toString()}
                                </div>
                            </div>

                            <div className="mt-2">
                                <span
                                    className={clsx(
                                        "text-xs px-2 py-1 rounded font-mono",
                                        completed ? "bg-gray-900 text-white" : "bg-green-500 text-white"
                                    )}
                                >
                                    {completed ? "COMPLETED" : "ACTIVE"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-6">
                                <div>
                                    <div className="text-xs font-mono text-gray-500">VIEWS</div>
                                    <div className="text-2xl font-bold">0</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-gray-500">ENGAGEMENTS</div>
                                    <div className="text-2xl font-bold">0</div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                                    <span>DELIVERABLES</span>
                                    <span>
                                        {done}/{target}
                                    </span>
                                </div>
                                <div className="mt-2 h-5 bg-gray-200 rounded overflow-hidden">
                                    <div
                                        className="h-5 bg-black"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <div className="text-center text-xs mt-1 font-mono text-gray-600">
                                    {pct}%
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            {/* Pagination + Add */}
            <section className="flex items-center justify-between px-6 pb-10">
                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={() => push({ filter, page: String(Math.max(1, page - 1)) })}
                        className="border px-3 py-2 rounded text-xs"
                        disabled={page <= 1}
                    >
                        ← PREVIOUS
                    </button>
                    <span className="text-xs">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => push({ filter, page: String(Math.min(totalPages, page + 1)) })}
                        className="border px-3 py-2 rounded text-xs"
                        disabled={page >= totalPages}
                    >
                        NEXT →
                    </button>
                </div>

                <button
                    onClick={() => router.push("/campaigns/new")}
                    className="flex items-center gap-2 border px-4 py-3 rounded text-xs bg-black text-white"
                >
                    <span className="text-lg leading-none">＋</span>
                    ADD CAMPAIGN
                </button>
            </section>
        </main>
    );
}