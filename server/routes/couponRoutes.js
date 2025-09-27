// routes/coupon.js
const express = require("express");
const router = express.Router();
const Coupon = require("../model/Coupon");

router.post("/apply", async (req, res) => {
  try {
    const { code } = req.body;

    // Find coupon by code
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) return res.status(400).json({ message: "Invalid coupon code" });

    // Check if coupon is active
    if (!coupon.isActive) return res.status(400).json({ message: "Coupon is inactive" });

    // Check expiry
    if (new Date() > coupon.expiryDate)
      return res.status(400).json({ message: "Coupon expired" });

    // Check usage limit
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit)
      return res.status(400).json({ message: "Coupon usage limit reached" });

    // Everything is fine, return discount
    res.json({
      discountType: coupon.discountType,
      discountValue: coupon.discountValue
    });

    // Increment used count
    coupon.usedCount += 1;
    await coupon.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
