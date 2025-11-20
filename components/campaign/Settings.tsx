"use client";

import { useState } from "react";

export default function SettingsTab({ campaign }: any) {
    const [name, setName] = useState(campaign.name);
    const [partner, setPartner] = useState(campaign.partners[0] ?? "");
    const [target, setTarget] = useState(campaign.deliverableTarget);
    const [startDate, setStartDate] = useState(
        new Date(campaign.startDate).toISOString().slice(0, 10)
    );

    async function save() {
        await fetch(`/api/campaigns/${campaign.id}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                partner,
                startDate,
                deliverableTarget: target,
            }),
        });
        alert("Saved!")
    }

    return (
        <div className="px-6 py-10 max-w-xl">
            <h3 className="font-mono text-xl mb-6">CAMPAIGN SETTINGS</h3>

            <div className="space-y-4">

                <div>
                    <label className="text-xs font-mono">NAME</label>
                    <input
                        className="w-full border p-2 rounded mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-mono">PARTNER</label>
                    <input
                        className="w-full border p-2 rounded mt-1"
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-mono">START DATE</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded mt-1"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs font-mono">DELIVERABLE TARGET</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded mt-1"
                        value={target}
                        onChange={(e) => setTarget(parseInt(e.target.value))}
                    />
                </div>

                <button
                    onClick={save}
                    className="px-4 py-2 bg-black text-white text-xs rounded"
                >
                    SAVE CHANGESj
                </button>

                <button
                    onClick={async () => {
                        if (confirm("Delete this campaign?")) {
                            await fetch(`/api/campaigns/${campaign.id}/delete`, { method: "DELETE" });
                            window.location.href = "/";
                        }
                    }}
                    className="px-4 py-2 text-xs bg-red-600 text-white rounded mt-4"
                >
                    DELETE CAMPAIGN
                </button>
            </div>
        </div>
    );
}