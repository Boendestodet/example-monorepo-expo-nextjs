import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { signToken } from "../../../../../lib/auth";
import { withCorsResponse } from "../../../../../lib/cors";
import { prisma } from "../../../../../lib/prisma";

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
    const name = body.name ? String(body.name) : null;

    if (!email || !password || password.length < 6) {
      return new NextResponse(JSON.stringify({ error: "Invalid email or password length < 6" }), { status: 400, headers });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new NextResponse(JSON.stringify({ error: "Email already registered" }), { status: 409, headers });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, passwordHash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = await signToken({ uid: user.id, email: user.email, name: user.name });
    const res = new NextResponse(JSON.stringify({ user, token }), { status: 201, headers });

    // Sätt även cookie för web
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
    return new NextResponse(JSON.stringify({ error: "Registration failed" }), { status: 500, headers });
  }
}
