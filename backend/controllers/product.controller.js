import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { title, category, price, rating, stock } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "plumbpro-products" }
      );

      imageUrl = uploadResult.secure_url;
    }

    const product = await Product.create({
      title,
      category,
      price,
      rating,
      stock,
      image: imageUrl,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Product creation failed" });
  }
};