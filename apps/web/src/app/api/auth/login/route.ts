import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../../lib/auth";
import { withCorsResponse } from "../../../../../lib/cors";

export const runtime = "nodejs";

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { headers: withCorsResponse(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = withCorsResponse(origin);

  try {
    const body = await req.json();
    const email = String(body.email || "")
      .toLowerCase()
      .trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: "Missing email or password" }), { status: 400, headers });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return new NextResponse(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return new NextResponse(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
    }

    const token = await signToken({ uid: user.id, email: user.email, name: user.name });
    const res = new NextResponse(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
      { status: 200, headers }
    );

    // Cookie för web
    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ error: "Login failed" }), { status: 500, headers });
  }
}
