"use client";

import { useRouter } from "next/navigation";

export default function DeliverablesTab({ campaign }: any) {
    const router = useRouter();
    const deleteDeliverable = async (d: any) => {
        await fetch(`/api/campaigns/${campaign.id}/deliverables/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                deliverableId: d.id,
            }),
        });
        router.push(`/campaigns/${campaign.id}`);
        alert("deleted")
    }
    return (
        <div className="px-6 py-10">
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => router.push(`/campaigns/${campaign.id}/deliverables/new`)}
                    className="px-4 py-2 bg-black text-white text-xs rounded"
                >
                    + NEW DELIVERABLE
                </button>
            </div>

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left font-mono text-xs">
                        <th className="p-2">DATE</th>
                        <th className="p-2">PLATFORM</th>
                        <th className="p-2">TYPE</th>
                        <th className="p-2">TITLE</th>
                        <th className="p-2">URL</th>
                        <th className="p-2">VIEWS</th>
                        <th className="p-2">LIKES</th>
                        <th className="p-2">ENGAGEMENTS</th>
                        <th className="p-2">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {campaign.deliverables.map((d: any) => (
                        <tr key={d.id} className="border-b">
                            <td className="p-2">{new Date(d.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}</td>
                            <td className="p-2">{d.platform.toUpperCase()}</td>
                            <td className="p-2">POST</td>
                            <td className="p-2">{d.title}</td>
                            <td className="p-2">
                                <a href={d.url} target="_blank" className="text-blue-600 underline">View</a>
                            </td>
                            <td className="p-2">-</td>
                            <td className="p-2">-</td>
                            <td className="p-2">-</td>
                            <td className="p-2">
                                <button onClick={() => deleteDeliverable(d)} className="text-xs text-red-600 hover:underline">DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}