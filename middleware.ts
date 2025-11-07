import { NextRequest, NextResponse } from "next/server";
import { fetchUser, verifySession } from "./lib/auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public routes and assets
    const isPublic =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/assets/") ||
        /\.[a-zA-Z0-9]+$/.test(pathname); // files like .png .svg .css .js
    if (isPublic) return NextResponse.next();

    // Everything else (including "/" and any nested path) requires auth
    const token = req.cookies.get("cheddy_session")?.value;
    console.log({ token })
    if (!token) {
        console.log("redirecting to login")
        return NextResponse.redirect(new URL("/login", req.url))
    };

    try {
        const { uid, username } = await verifySession(token);
        console.log({ uid, username })
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", uid);
        requestHeaders.set("x-user-username", username)
        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (e) {
        console.error(e)
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Match "/" and every path (let the code above skip public ones)
export const config = {
    matcher: ["/", "/:path*"],
};