import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const {
      userId,       
      firstName,
      lastName,
      profilePic,
      hobbies
    } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    if (
      !firstName &&
      !lastName &&
      !profilePic &&
      !hobbies
    ) {
      return new Response(
        JSON.stringify({ error: "Nothing to update" }),
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.updateMany({
      where: { id: userId },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        profilePic: profilePic ?? undefined,
        hobbies: hobbies ?? undefined
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
export const GET = async(req:Request)=>{
  const user = await prisma.user.findMany()
  return NextResponse.json({ message: user }, { status: 200 });
}
