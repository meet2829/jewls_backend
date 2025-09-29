const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Amount is required and must be a number" });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_${orderId || Date.now()}`,
    };

    // ✅ use razorpay instance (not "instance")
    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ message: "Error creating payment order", error: error.message });
  }
});

module.exports = router;
