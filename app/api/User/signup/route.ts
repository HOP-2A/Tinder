import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
const JWT_SECRET= process.env.JWT_SECRET


export async function POST(req:Request) {
    const {username,firstName, lastName, email,password}= await req.json()
    if(!username || !email || !password){
        return NextResponse.json("all fields should be filled")
    }

    const exisstingEmail =await prisma.user.findUnique({
        where:{email}
    })

    const hashedPassword = await bcrypt.hash(password,10);

    if(exisstingEmail) return NextResponse.json("email exissting")

    const NewUser =  prisma.user.create({
        data:{
            username,   
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    const accessToken = jwt.sign({ data: NewUser }, JWT_SECRET, {
      expiresIn: "12h",
    });

    return NextResponse.json(`userCreate success ${NewUser}`)
}