import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
export async function POST(req:Request) {
    const body = await req.json()
    const {images, caption,userId} = body
    console.log(body);
    console.log(userId);


    if(!images || !caption || !userId){
        return NextResponse.json({message:"duttsaaa"},{status:400})
    }
await prisma.post.create({
        data:{
            images:Array.isArray(images) ? images : [images],
            caption,
            userId,
        }
    })
    return NextResponse.json({message:"post created"},{status:200})
}   