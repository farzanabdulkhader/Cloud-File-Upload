import multipleUploadRouter from "./routes/multipleUploadRouter.js";
import singleUploadRouter from "./routes/singleUploadRouter.js";
import connectDb from "./connectDb.js";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());

// Cloudinary configuration
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Static file serving
app.use("/uploads", express.static("uploads"));
app.use("/multiple-uploads", express.static("multiple-uploads"));

// Ensure upload directories exist
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};
ensureDirectoryExists("./uploads");
ensureDirectoryExists("./multiple-uploads");

// Routes setup
app.use("/api/single", singleUploadRouter);
app.use("/api/multiple", multipleUploadRouter);

const startServer = async () => {
  try {
    // Connect to the database
    await connectDb();
    console.log("Database connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
