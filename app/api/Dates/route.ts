import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const date = await prisma.date.findMany({
    include: { userA: true, userB: true, place: true },
  });
  return NextResponse.json(date);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userA, userB, place, message } = body;
  const newDate = await prisma.date.create({
    data: {
      userAId: userA,
      userBId: userB,
      placeId: place,
      message,
    },
  });

  return NextResponse.json(newDate);
}
