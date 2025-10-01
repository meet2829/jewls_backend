const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// Contact
router.post("/contact", authController.Contact);
router.get("/massage",authController.massage)

// OTP
router.post("/send-otp", authController.emialotp);
router.post("/verify-otp", authController.verifyotp);
router.post("/reset-password", authController.resetPassword);

// Users
router.get("/users", authController.getAllUsers);

module.exports = router;
