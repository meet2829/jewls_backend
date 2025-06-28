const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/JewlsDB", {
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
};

module.exports = connectDB;