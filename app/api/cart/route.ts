import { connectDB } from "../../lib/mongodb";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

// GET — fetch user's cart
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const items = await Cart.find({ userId });
  return NextResponse.json(items);
}

// POST — add item to cart
export async function POST(req: Request) {
  await connectDB();
  const { userId, productId, name, price, image } = await req.json();

  const existing = await Cart.findOne({ userId, productId });
  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return NextResponse.json(existing);
  }

  const item = await Cart.create({ userId, productId, name, price, image, quantity: 1 });
  return NextResponse.json(item, { status: 201 });
}

// PATCH — increase or decrease quantity
export async function PATCH(req: Request) {
  await connectDB();
  const { userId, productId, action } = await req.json();

  const item = await Cart.findOne({ userId, productId });
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  if (action === "increase") {
    item.quantity += 1;
    await item.save();
  } else if (action === "decrease") {
    if (item.quantity <= 1) {
      await Cart.findByIdAndDelete(item._id);
      return NextResponse.json({ message: "Item removed" });
    }
    item.quantity -= 1;
    await item.save();
  }

  return NextResponse.json(item);
}

// DELETE — remove single item
export async function DELETE(req: Request) {
  await connectDB();
  const { cartItemId } = await req.json();
  await Cart.findByIdAndDelete(cartItemId);
  return NextResponse.json({ message: "Removed from cart." });
}