export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const EditSchema = z.object({
    name: z.string().min(1),
    partner: z.string().optional(),
    partners: z.array(z.string()).optional(),
    startDate: z.string(), // yyyy-mm-dd
    deliverableTarget: z.number().int().positive(),
});

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const parsed = EditSchema.parse({
            ...body,
            deliverableTarget: Number(body?.deliverableTarget),
        });

        // Normalize partners to an array
        const partnersArray =
            parsed.partners ??
            (parsed.partner ? [parsed.partner] : []);

        const updated = await prisma.campaign.update({
            where: { id },
            data: {
                name: parsed.name,
                partners: partnersArray,
                startDate: new Date(parsed.startDate),
                deliverableTarget: parsed.deliverableTarget,
            },
        });

        return NextResponse.json({ success: true, campaign: updated });
    } catch (e: any) {
        return NextResponse.json(
            { error: e.message ?? "Invalid request" },
            { status: 400 }
        );
    }
}