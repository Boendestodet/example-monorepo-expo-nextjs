import { NextRequest, NextResponse } from "next/server";

import { getTokenFromRequest, verifyToken } from "../../../../../lib/auth";
import { withCorsResponse } from "../../../../../lib/cors";
import { prisma } from "../../../../../lib/prisma";

export const runtime = "nodejs";

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { headers: withCorsResponse(req.headers.get("origin")) });
}

export async function GET(req: NextRequest) {
  const headers = withCorsResponse(req.headers.get("origin"));
  try {
    const token = getTokenFromRequest(req);
    if (!token) return new NextResponse(JSON.stringify({ user: null }), { status: 200, headers });

    const payload = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.uid) },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    return new NextResponse(JSON.stringify({ user }), { status: 200, headers });
  } catch {
    return new NextResponse(JSON.stringify({ user: null }), { status: 200, headers });
  }
}
