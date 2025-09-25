const express = require("express");
const cors = require("cors");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");
const productRoutes = require("./server/routes/productRoutes");
const orderRoutes = require("./server/routes/orderRoutes");
const paymentRoutes = require("./server/routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes with prefixes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment",paymentRoutes)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
