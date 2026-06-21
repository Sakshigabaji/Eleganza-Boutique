import { connectDB } from "../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "No account found with this email." }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });

    return NextResponse.json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}