const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const Product=require("../model/product")

router.post("/products", productController.addProduct);     // Add product
router.get("/products", productController.getAllProducts);  // Fetch all products
// server.js or routes/product.js
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format (MongoDB IDs must be 24 hex chars)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;