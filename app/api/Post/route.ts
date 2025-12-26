import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { images, caption, userId } = body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!images || !caption || !user) {
    return NextResponse.json({ message: "duttsaaa" }, { status: 400 });
  }

  const createdPost = await prisma.post.create({
    data: {
      images: Array.isArray(images) ? images : [images],
      caption,
      userId: userId,
    },
  });
  return NextResponse.json({ message: createdPost }, { status: 200 });
}

export async function GET() {
  const allPost = await prisma.post.findMany({
    include: { user: true },
  });
  return NextResponse.json({ message: allPost }, { status: 200 });
}
