import { connectDB } from "../../../lib/mongodb";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

// DELETE — clear entire cart for a user
export async function DELETE(req: Request) {
  await connectDB();
  const { userId } = await req.json();
  await Cart.deleteMany({ userId });
  return NextResponse.json({ message: "Cart cleared." });
}