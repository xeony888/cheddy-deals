// app/api/campaigns/[id]/deliverables/delete/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const DeleteSchema = z.object({
    deliverableId: z.string(),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        console.log("HERE")
        const { id: campaignId } = await params;
        const body = await req.json();

        const { deliverableId } = DeleteSchema.parse(body);
        console.log({ deliverableId });
        // Ensure deliverable exists & belongs to this campaign
        const deliverable = await prisma.deliverable.findUnique({
            where: { id: deliverableId },
            select: { campaignId: true },
        });

        if (!deliverable) {
            return NextResponse.json(
                { error: "Deliverable not found" },
                { status: 404 }
            );
        }
        console.log(`${campaignId}, ${deliverable.campaignId}`);
        if (deliverable.campaignId !== campaignId) {
            return NextResponse.json(
                { error: "Deliverable does not belong to this campaign" },
                { status: 400 }
            );
        }

        await prisma.deliverable.delete({
            where: { id: deliverableId },
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json(
            { error: e.message ?? "Invalid request" },
            { status: 400 }
        );
    }
}