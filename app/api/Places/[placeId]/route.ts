import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET ( context: { params: { placeId: string } }) {
    const { placeId } = await context.params;
    const place = await prisma.place.findUnique({
       where: {id: placeId},
    }) 
    
    return NextResponse.json({ message: place }, { status: 200 });
}
