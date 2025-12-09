import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(res:Response){
    const AllPlaces = await prisma.place.findMany()
    return NextResponse.json({ message: AllPlaces }, { status: 200 });
}