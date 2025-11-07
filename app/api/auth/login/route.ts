import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signSession } from "@/lib/auth";


const schema = z.object({ username: z.string(), password: z.string() });


export async function POST(req: NextRequest) {
    const { username, password } = schema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


    const jwt = await signSession({ uid: user.id, username: user.username });


    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: "cheddy_session", value: jwt, httpOnly: true, sameSite: "lax", path: "/", secure: true, maxAge: 60 * 60 * 24 * 7 });
    return res;
}