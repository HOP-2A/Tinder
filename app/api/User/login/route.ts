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

  if (!user) {
    return NextResponse.json("User not found.");
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json("Incorrect password.");
  }

  return NextResponse.json("Login successful");
}