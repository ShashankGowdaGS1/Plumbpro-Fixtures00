import express from "express";
import Product from "../models/Product.js";
import protectAdmin from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* ======================================================
   🔐 ADD PRODUCT (WITH IMAGE)
====================================================== */
router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, category, price, rating, stock } = req.body;

      const product = await Product.create({
        title,
        category,
        price,
        rating,
        stock,
        image: req.file
          ? `http://localhost:5000/uploads/${req.file.filename}`
          : "",
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ======================================================
   🔐 UPDATE PRODUCT (WITH OPTIONAL IMAGE)
====================================================== */
router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, category, price, rating, stock } = req.body;

      const updatedData = {
        title,
        category,
        price,
        rating,
        stock,
      };

      if (req.file) {
        updatedData.image = `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ======================================================
   🔐 DELETE PRODUCT
====================================================== */
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ======================================================
   🌍 GET ALL PRODUCTS (PUBLIC)
====================================================== */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export default router;