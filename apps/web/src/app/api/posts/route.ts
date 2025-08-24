import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET /api/posts
export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

// POST /api/posts  (body: { title: string; content?: string })
export async function POST(req: Request) {
  const body = await req.json();
  const post = await prisma.post.create({
    data: { title: body.title, content: body.content ?? null, published: false },
  });
  return NextResponse.json(post, { status: 201 });
}
