import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();
const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x6zhruo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      { dbName: process.env.DB_NAME }
    );
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

export default connectDb;
