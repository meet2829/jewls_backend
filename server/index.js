const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require('body-parser');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", productRoutes);



// Server
app.listen(8080, () => {
  console.log("✅ Server started on port 8080");
});