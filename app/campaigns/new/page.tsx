"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function NewCampaignPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [partner, setPartner] = useState(""); // optional, single text -> partners[0]
  const [startDate, setStartDate] = useState<string>("");
  const [target, setTarget] = useState<number>(20);
  const valid = name.trim() && startDate && target > 0;

  const startedMMDD = useMemo(() => {
    if (!startDate) return "";
    const d = new Date(startDate);
    return d.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });
  }, [startDate]);

  async function submit() {
    if (!valid) return;
    const body = {
      name,
      partners: partner.trim() ? [partner.trim()] : [],
      startDate, // yyyy-mm-dd
      deliverableTarget: target,
    };
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.replace("/?filter=active&page=1");
  }

  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between px-5 py-3 border-b">
        <div className="font-extrabold italic text-2xl">
          <span className="border-b-8 border-black pb-1">CHEDDY</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.replace("/")} className="text-xs border px-3 py-2 rounded">
            ADMIN PANEL
          </button>
          <button onClick={() => router.replace("/login")} className="text-xs border px-3 py-2 rounded">
            LOGOUT
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 p-6">
        {/* Form */}
        <section className="rounded border bg-[#F6F8FA] p-6">
          <h2 className="font-mono text-xl mb-4">CREATE NEW CAMPAIGN</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono mb-2">CAMPAIGN NAME *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter campaign name"
                className="w-full rounded border px-3 py-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2">PARTNER</label>
              <input
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                placeholder="Partner name (optional)"
                className="w-full rounded border px-3 py-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2">START DATE *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded border px-3 py-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2">DELIVERABLE TARGET *</label>
              <input
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value || "0", 10))}
                className="w-full rounded border px-3 py-2 bg-white"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="border px-4 py-2 rounded text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={submit}
                disabled={!valid}
                className="border px-4 py-2 rounded text-xs bg-black text-white disabled:opacity-60"
              >
                CREATE CAMPAIGN
              </button>
            </div>
          </div>
        </section>

        {/* Preview Card */}
        <aside className="rounded border bg-[#F6F8FA] p-6">
          <div className="font-mono text-lg mb-4">PREVIEW</div>
          <div className="rounded border bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="font-mono font-bold tracking-widest">
                {name || "Campaign Name"}
              </div>
              <div className="text-xs text-gray-500">Started: {startedMMDD || "--/--"}</div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-4">
              <div>
                <div className="text-xs font-mono text-gray-500">VIEWS</div>
                <div className="text-2xl font-bold">0</div>
              </div>
              <div>
                <div className="text-xs font-mono text-gray-500">CLICKS</div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-mono text-gray-500">CTR</div>
              <div className="h-2 bg-gray-200 rounded mt-2" />
              <div className="flex justify-between text-xs font-mono text-gray-600 mt-2">
                <span>0%</span>
                <span>0/{target || 20}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}