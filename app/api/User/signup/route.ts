import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    const {username,firstName, lastName, email,password}= await req.json()
    if(!username || !email || !password){
        return NextResponse.json("all fields should be filled")
    }

    const existingEmail =await prisma.user.findUnique({
        where:{email}
    })

    const hashedPassword = await bcrypt.hash(password,10);

        if (existingEmail) {
  return NextResponse.json(
    { message: "email existing" },
    { status: 400 }
  );
}


    const NewUser = await  prisma.user.create({
        data:{
            username,   
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })
    console.log(NewUser);
    
    return NextResponse.json({message:"amjilttai"},{status:200})

    // return NextResponse.json({message:NewUser},{status:200})   
}
