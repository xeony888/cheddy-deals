// app/api/campaigns/[id]/delete/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;

        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Delete deliverables first (if you did not set cascade delete in schema)
        await prisma.deliverable.deleteMany({
            where: { campaignId: id },
        });

        // Delete campaign
        await prisma.campaign.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error("Delete campaign error:", e);
        return NextResponse.json(
            { error: e.message ?? "Failed to delete campaign" },
            { status: 500 }
        );
    }
}