import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const match = await prisma.match.findMany({
    include: { userA: true, userB: true },
  });
  return NextResponse.json(match);
}
