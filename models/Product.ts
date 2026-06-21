import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, required: true },
  category:    { type: String, enum: ["rings", "necklaces", "bracelets", "earrings"] },
  description: { type: String, default: "" },
  stock:       { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);