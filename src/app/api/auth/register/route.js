import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Connecting db");
  await connectDB();
  const { username, email, password } = await req.json();

  const userExists = await User.findOne({ email });
  if (userExists)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({
    message: "User registered successfully",
    user: newUser,
  });
}
