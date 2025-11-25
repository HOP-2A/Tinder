import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const JWT_SECRET= process.env.JWT_SECRET

  if (!email || !password) {
    return NextResponse.json("All fields are required.");
  }

  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findFirst({
    where: { email: normalizedEmail }
  });

  if(user){
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch===true) {
        const accessToken = jwt.sign({ data: user }, JWT_SECRET, {
            expiresIn: "12h",
        });
        return NextResponse.json(accessToken);
    } else {
        return NextResponse.json("wrong password try again")
    }
  } else {
    return NextResponse.json("need to register")
  }
}