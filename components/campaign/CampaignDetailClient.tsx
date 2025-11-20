"use client";

import { useState } from "react";
import OverviewTab from "./Overview";
import DeliverablesTab from "./Deliverables";
import SettingsTab from "./Settings";
import { useRouter } from "next/navigation";
import { Campaign } from "@prisma/client";

type CampaignDetailProps = {
    username: string;
    campaign: Campaign
};

export default function CampaignDetailClient({ campaign, username }: CampaignDetailProps) {
    const [tab, setTab] = useState<"overview" | "deliverables" | "settings">("overview");
    const [range, setRange] = useState<"30days" | "quarter">("30days");
    const router = useRouter();

    return (
        <main className="min-h-screen pb-20">
            {/* Top nav */}
            <header className="flex justify-between items-center px-6 py-4 border-b">
                <div className="font-extrabold italic text-2xl">
                    <span className="border-b-8 border-black pb-1">CHEDDY</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => router.push("/admin")}
                        className="px-3 py-2 text-xs border rounded"
                    >
                        ADMIN PANEL
                    </button>
                    <button
                        onClick={() => router.push("/login")}
                        className="px-3 py-2 text-xs border rounded"
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            {/* Back link */}
            <div className="px-6 py-4 text-sm font-mono text-blue-700 cursor-pointer"
                onClick={() => router.push("/")}>
                ← BACK TO CAMPAIGNS
            </div>

            {/* Campaign title */}
            <div className="px-6 text-3xl font-extrabold font-mono tracking-widest">
                {campaign.name.toUpperCase()}
            </div>

            {/* Range Selector */}
            <div className="flex gap-2 px-6 mt-6">
                <button
                    onClick={() => setRange("30days")}
                    className={`px-4 py-2 text-xs border rounded ${range === "30days" ? "bg-black text-white" : ""
                        }`}
                >
                    30 DAYS
                </button>
                <button
                    onClick={() => setRange("quarter")}
                    className={`px-4 py-2 text-xs border rounded ${range === "quarter" ? "bg-black text-white" : ""
                        }`}
                >
                    QUARTER
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-16 px-6 mt-10 border-b">
                {["overview", "deliverables", "settings"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t as any)}
                        className={`pb-2 text-sm font-mono tracking-wide ${tab === t ? "border-b-2 border-black" : "text-gray-500"
                            }`}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Tab panels */}
            {tab === "overview" && <OverviewTab campaign={campaign} range={range} />}
            {tab === "deliverables" && <DeliverablesTab campaign={campaign} />}
            {tab === "settings" && <SettingsTab campaign={campaign} />}
        </main>
    );
}