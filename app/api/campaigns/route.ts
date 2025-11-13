import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1),
    partners: z.array(z.string()).default([]),
    startDate: z.string(), // yyyy-mm-dd
    deliverableTarget: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, partners, startDate, deliverableTarget } = schema.parse({
            ...body,
            deliverableTarget: Number(body?.deliverableTarget),
        });

        const campaign = await prisma.campaign.create({
            data: {
                name,
                partners,
                startDate: new Date(startDate),
                deliverableTarget,
            },
        });

        return NextResponse.json({ id: campaign.id });
    } catch (e: any) {
        return NextResponse.json({ error: e.message ?? "Invalid" }, { status: 400 });
    }
}