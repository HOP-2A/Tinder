import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    const { email, password } = await req.json();
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
        return NextResponse.json("Success login",{status:200});
    } else {
        return NextResponse.json("wrong password try again", {status:400})
    }
  } else {
    return NextResponse.json("need to register",{status:400})
  }
}