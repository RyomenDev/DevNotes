import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
//   console.log("Connecting db");
  await connectDB();
  const { username, email, password } = await req.json();
  //   console.log({ username, email, password });

  const userExists = await User.findOne({ email });
  if (userExists)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const newUser = new User({ username, email, password });
  await newUser.save(); // password gets hashed here

  return NextResponse.json({
    message: "User registered successfully",
    user: newUser,
  });
}
