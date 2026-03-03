import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import protectAdmin from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= CREATE SALE (Customer - No Auth Required) ================= */
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /* 🔴 STOCK VALIDATION */
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    /* 🧮 CALCULATE TOTAL */
    const totalAmount = product.price * quantity;

    /* 📉 REDUCE STOCK FIRST */
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update stock" });
    }

    /* 💾 CREATE SALE */
    const sale = await Sale.create({
      product: productId,
      quantity,
      totalAmount,
    });

    // Populate product details for response
    await sale.populate("product", "title price");

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET SALES (Admin Only) ================= */
router.get("/", protectAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [sales, total] = await Promise.all([
      Sale.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("product", "title price image"),
      Sale.countDocuments()
    ]);

    res.json({
      sales,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
