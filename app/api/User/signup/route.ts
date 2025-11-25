import { prisma } from "@/lib/db"
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const {username,firstName, lastName, email,password}= await req.json()
    if(!username || !email || !password){
        return NextResponse.json("all fields should be filled")
    }

    const exisstingEmail = prisma.user.findUnique({
        where:{email}
    })

    const hashedPassword = await bcrypt.hash(password,10);

    if(exisstingEmail) return NextResponse.json("email exissting")

    prisma.user.create({
        data:{
            username,   
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })
}