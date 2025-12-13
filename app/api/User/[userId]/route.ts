import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (req:Request, context: { params: { userId: string } }) {
    const { userId } = await context.params;
    const user = await prisma.user.findUnique({
       where: {id: userId},
    }) 
    
    return NextResponse.json({ message: user }, { status: 200 });
}
