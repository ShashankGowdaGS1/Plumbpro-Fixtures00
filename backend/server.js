import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
connectDB();

const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ✅ JSON parser */
app.use(express.json());

/* ✅ ROUTES */
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/admin", adminRoutes);

/* ✅ STATIC */
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);