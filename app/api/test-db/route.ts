import { connectDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: "✅ Connected",
      message: "MongoDB is connected successfully!" 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "❌ Failed",
      message: "MongoDB connection failed!",
      error: String(error)
    }, { status: 500 });
  }
}