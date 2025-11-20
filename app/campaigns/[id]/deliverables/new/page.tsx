import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import NewDeliverableClient from "@/components/campaign/NewDeliverableClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function NewDeliverablePage({ params }: Props) {
    const { id } = await params;
    const h = await headers();
    const username = h.get("x-user-username") ?? "unknown";

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        select: { id: true, name: true },
    });

    if (!campaign) {
        return (
            <div className="p-10 text-center text-red-500 font-mono">
                Campaign not found.
            </div>
        );
    }

    return (
        <NewDeliverableClient
            campaign={campaign}
            username={username}
        />
    );
}