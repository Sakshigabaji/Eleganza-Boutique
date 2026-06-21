import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String },
}, { timestamps: true });

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);