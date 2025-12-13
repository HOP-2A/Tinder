import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request,) {
  try {
    const user = await prisma.user.findMany({
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
