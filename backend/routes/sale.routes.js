import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import protectAdmin from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= CREATE SALE ================= */
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    /* 🔴 STOCK VALIDATION */
    if (product.stock < quantity)
      return res
        .status(400)
        .json({ message: "Not enough stock available" });

    /* 🧮 CALCULATE TOTAL */
    const totalAmount = product.price * quantity;

    /* 💾 CREATE SALE */
    const sale = await Sale.create({
      product: productId,
      quantity,
      totalAmount,
    });

    /* 📉 REDUCE STOCK */
    product.stock -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET SALES ================= */
router.get("/", protectAdmin, async (req, res) => {
  const sales = await Sale.find().populate("product");
  res.json(sales);
});

export default router;