const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

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

app.get('/loaderio-5d382e357ef13e8e5a4802026a75d186.txt', (req, res) => res.type('text').send('loaderio-<token>'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
