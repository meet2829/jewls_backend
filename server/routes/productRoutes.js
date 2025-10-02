const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const Product=require("../model/product")


// Add product
router.post("/products", productController.addProduct);

// Get all products
router.get("/products", productController.getAllProducts);

// Get single product
router.get("/products/:id", productController.getProductById); 

// Update product
router.put("/products/:id", productController.updateProduct);

// Delete product
router.delete("/products/:id", productController.deleteProduct);

router.get('/search',productController.searchProduct);

router.get('/categories',productController.getProductBycategories);


module.exports = router;