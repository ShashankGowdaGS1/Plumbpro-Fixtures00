import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    price: Number,
    rating: Number,
    stock: Number,
    image: String, // ✅ ADD THIS
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);