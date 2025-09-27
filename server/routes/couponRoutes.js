// routes/coupon.js
const express = require("express");
const router = express.Router();
const Coupon = require("../model/Coupon");
const CouponUsage =require ("../model/CouponUsage")

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
    coupon.usedBy.push({
  userId: req.body.userId,
  amount: req.body.amount,
  date: new Date()
});
    await coupon.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/track-usage", async (req, res) => {
  try {
    const { code, userId, totalBeforeDiscount, discountAmount, totalAfterDiscount } = req.body;

    if (!code || !userId) {
      return res.status(400).json({ message: "Coupon code and userId required" });
    }

    const usage = new CouponUsage({
      code,
      userId,
      totalBeforeDiscount,
      discountAmount,
      totalAfterDiscount,
    });

    await usage.save();
    res.json({ message: "Coupon usage tracked successfully", usage });
  } catch (err) {
    res.status(500).json({ message: "Error tracking coupon usage", error: err });
  }
});


router.get("/usage", async (req, res) => {
  try {
    const coupons = await CouponUsage.find()
      .populate("user", "name email") // show user info
      .lean();

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Error fetching coupon usage", error: err });
  }
});


module.exports = router;
