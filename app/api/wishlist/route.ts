import { connectDB } from "../../lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

// GET — fetch user's wishlist
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const items = await Wishlist.find({ userId });
  return NextResponse.json(items);
}

// POST — add item to wishlist
export async function POST(req: Request) {
  await connectDB();
  const { userId, productId, name, price, image } = await req.json();

  const existing = await Wishlist.findOne({ userId, productId });
  if (existing)
    return NextResponse.json({ error: "Already in wishlist." }, { status: 400 });

  const item = await Wishlist.create({ userId, productId, name, price, image });
  return NextResponse.json(item, { status: 201 });
}

// DELETE — remove item from wishlist
export async function DELETE(req: Request) {
  await connectDB();
  const { wishlistItemId } = await req.json();
  await Wishlist.findByIdAndDelete(wishlistItemId);
  return NextResponse.json({ message: "Removed from wishlist." });
}