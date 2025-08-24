import { NextRequest, NextResponse } from "next/server";

import { withCorsResponse } from "../../../../../lib/cors";

export const runtime = "nodejs";

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { headers: withCorsResponse(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const headers = withCorsResponse(req.headers.get("origin"));
  const res = new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers });
  res.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
