import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "./models/Admin.js";

await mongoose.connect(process.env.MONGO_URI);

await Admin.deleteMany();

await Admin.create({
  username: "admin",
  password: "admin123",
});

console.log("✅ Admin created");
process.exit();