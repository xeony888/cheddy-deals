import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";
import { User } from "@prisma/client";


const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const alg = "HS256";


export async function signSession(payload: { uid: string; username: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function fetchUser(uid: string): Promise<User> {
    return await prisma.user.findUnique({ where: { id: uid } })
}
export async function verifySession(token: string) {
    const { payload } = await jwtVerify(token, secret);
    return payload as { uid: string; username: string; iat: number; exp: number };
}