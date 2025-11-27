import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function  GET(req:Request) {
    const allPost = await prisma.post.findMany()
    return NextResponse.json({message:allPost},{status:200})
}