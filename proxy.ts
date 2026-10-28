import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(req: NextRequest) {
    const sessionCokies = getSessionCookie(req);

    if (!sessionCokies) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: "/main/:path*",
}