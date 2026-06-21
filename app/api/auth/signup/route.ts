import { connectDB } from "../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role, portfolio } = await req.json();

    const existing = await User.findOne({ email });
    if (existing)
      return NextResponse.json({ error: "Email already registered." }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role, portfolio });

    return NextResponse.json({ message: "Account created!", userId: user._id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}