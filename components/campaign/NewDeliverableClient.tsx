"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PLATFORMS = ["Instagram", "SnapChat", "TikTok", "YouTube", "X"] as const;

export default function NewDeliverableClient({
    campaign,
    username,
}: {
    campaign: { id: string; name: string };
    username: string;
}) {
    const router = useRouter();

    const [platform, setPlatform] = useState<string>("Instagram");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [date, setDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    );

    const valid = title.trim() && url.trim() && platform;

    async function submit() {
        if (!valid) return;

        const res = await fetch(`/api/campaigns/${campaign.id}/deliverables/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                url,
                platform,
                createdAt: date,
            }),
        });

        if (res.ok) {
            router.replace(`/campaigns/${campaign.id}?tab=deliverables`);
        }
    }

    return (
        <main className="min-h-screen pb-20">

            {/* Top bar */}
            <header className="flex justify-between items-center px-5 py-3 border-b">
                <div className="font-extrabold italic text-2xl">
                    <span className="border-b-8 border-black pb-1">CHEDDY</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/admin")}
                        className="text-xs border px-3 py-2 rounded"
                    >
                        ADMIN PANEL
                    </button>
                    <button
                        onClick={() => router.push("/login")}
                        className="text-xs border px-3 py-2 rounded"
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            {/* Back link */}
            <div
                className="px-6 py-4 text-sm font-mono text-blue-700 cursor-pointer"
                onClick={() => router.push(`/campaigns/${campaign.id}?tab=deliverables`)}
            >
                ← BACK TO CAMPAIGN
            </div>

            {/* Title */}
            <div className="px-6 text-3xl font-extrabold font-mono tracking-widest mb-10">
                NEW DELIVERABLE
            </div>

            {/* Form Container */}
            <div className="px-6">
                <div className="rounded border bg-[#F6F8FA] p-6 max-w-2xl">

                    <h2 className="font-mono text-xl mb-6">DELIVERABLE DETAILS</h2>

                    <div className="space-y-6">

                        {/* Platform */}
                        <div>
                            <label className="text-xs font-mono mb-2 block">PLATFORM *</label>

                            <select
                                className="border w-full p-2 rounded bg-white"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                {PLATFORMS.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="text-xs font-mono mb-2 block">DATE *</label>
                            <input
                                type="date"
                                className="border w-full p-2 rounded bg-white"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-xs font-mono mb-2 block">TITLE *</label>
                            <input
                                className="border w-full p-2 rounded bg-white"
                                placeholder="Enter deliverable title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* URL */}
                        <div>
                            <label className="text-xs font-mono mb-2 block">URL *</label>
                            <input
                                className="border w-full p-2 rounded bg-white"
                                placeholder="Enter media URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() =>
                                    router.push(`/campaigns/${campaign.id}?tab=deliverables`)
                                }
                                className="border px-4 py-2 rounded text-xs"
                            >
                                CANCEL
                            </button>
                            <button
                                disabled={!valid}
                                onClick={submit}
                                className="border px-4 py-2 rounded text-xs bg-black text-white disabled:opacity-60"
                            >
                                CREATE DELIVERABLE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}