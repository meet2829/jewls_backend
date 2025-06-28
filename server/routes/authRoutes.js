const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const productController = require("../controller/productController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post('/contact',authController.Contact)

router.post("/products", productController.addProduct);     // Add product
router.get("/products", productController.getAllProducts); 


router.post('/send-otp', authController.emialotp);

router.post('/verify-otp',authController.verifyotp);

module.exports = router;