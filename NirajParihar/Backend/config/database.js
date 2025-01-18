const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
