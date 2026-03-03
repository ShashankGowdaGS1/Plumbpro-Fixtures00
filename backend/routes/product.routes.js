import express from "express";
import Product from "../models/Product.js";
import protectAdmin from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* ======================================================
   🌍 GET ALL PRODUCTS (PUBLIC)
====================================================== */
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort
    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(query)
    ]);

    res.json({
      products,
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

/* ======================================================
   🌍 GET SINGLE PRODUCT (PUBLIC)
====================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

      let imageUrl = "";
      
      if (req.file) {
        // Use local file path
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const product = await Product.create({
        title,
        category,
        price: Number(price),
        rating: Number(rating) || 0,
        stock: Number(stock) || 0,
        image: imageUrl,
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
        price: Number(price),
        rating: Number(rating),
        stock: Number(stock),
      };

      if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

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
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
