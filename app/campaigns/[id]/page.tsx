// app/campaigns/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import CampaignDetailClient from "@/components/campaign/CampaignDetailClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function CampaignPage({ params }: Props) {
    const { id } = await params;
    const h = await headers();
    const username = h.get("x-user-username") ?? "unknown";

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            deliverables: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!campaign) {
        return (
            <div className="p-10 text-center text-red-500 font-mono">
                Campaign not found.
            </div>
        );
    }

    return (
        <CampaignDetailClient
            campaign={JSON.parse(JSON.stringify(campaign))}
            username={username}
        />
    );
}