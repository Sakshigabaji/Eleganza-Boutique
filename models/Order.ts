import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name:      String,
      price:     Number,
      quantity:  Number,
      image:     String,
    }
  ],
  total:   { type: Number, required: true },
  status:  { type: String, enum: ["pending", "confirmed", "delivered"], default: "pending" },
  address: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);