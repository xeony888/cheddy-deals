// app/api/campaigns/[id]/deliverables/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1),
    url: z.string().min(1),
    platform: z.string().min(1),
    createdAt: z.string(), // yyyy-mm-dd
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const body = await req.json();
        const parsed = schema.parse(body);

        await prisma.deliverable.create({
            data: {
                title: parsed.title,
                url: parsed.url,
                platform: parsed.platform as any,
                createdAt: new Date(parsed.createdAt),
                campaignId: id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json(
            { error: e.message ?? "Invalid" },
            { status: 400 }
        );
    }
}