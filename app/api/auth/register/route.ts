import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";


const schema = z.object({ username: z.string().max(32), password: z.string().max(128) });


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = schema.parse(body);


        const existing = await prisma.user.findUnique({ where: { username } });
        if (existing) return NextResponse.json({ error: "Username taken" }, { status: 409 });


        const passwordHash = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({ data: { username, password: passwordHash } });


        return NextResponse.json({ id: user.id, username: user.username });
    } catch (e: any) {
        return NextResponse.json({ error: e.message ?? "Invalid" }, { status: 400 });
    }
}