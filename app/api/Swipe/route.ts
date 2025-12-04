import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { fromUserId, toUserId, isLiked } = await req.json();

    if (!fromUserId || !toUserId || isLiked === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const swipe = await prisma.swipe.create({
      data: {
        fromUserId,
        toUserId,
        isLiked,
      },
    });

    let match = null;

    if (isLiked) {
      const oppositeSwipe = await prisma.swipe.findFirst({
        where: {
          fromUserId: toUserId, 
          toUserId: fromUserId,
          isLiked: true,
        },
      });

      if (oppositeSwipe) {
        match = await prisma.match.create({
          data: {
            userAId: fromUserId,
            userBId: toUserId,
          },
        });
      }
    }

    return NextResponse.json({ swipe, match });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process swipe" },
      { status: 500 }
    );
  }
}
