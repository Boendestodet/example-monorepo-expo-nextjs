import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export const config = { matcher: ["/dashboard/:path*"] };

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set({ name: "auth_token", value: "", httpOnly: true, path: "/", maxAge: 0 });
    return res;
  }
}
