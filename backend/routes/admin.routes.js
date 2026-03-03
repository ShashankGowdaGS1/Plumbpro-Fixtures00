import express from "express";
import protectAdmin from "../middleware/auth.middleware.js";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

const router = express.Router();

/* ================= ADMIN STATS ================= */
router.get("/stats", protectAdmin, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      lowStockProducts,
      recentSales
    ] = await Promise.all([
      Product.countDocuments(),
      Sale.countDocuments(),
      Product.find({ stock: { $lt: 10 } }).limit(5).select("title stock"),
      Sale.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("product", "title")
    ]);

    const revenueData = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockProducts,
      recentSales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
