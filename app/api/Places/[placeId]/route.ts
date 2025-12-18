import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET (req:Request, context: { params: { placeId: string } }) {
    const { placeId } = await context.params;
    console.log(placeId)
    const place = await prisma.place.findUnique({
       where: {id: placeId},
    }) 
    
    return NextResponse.json({ message: place }, { status: 200 });
}
