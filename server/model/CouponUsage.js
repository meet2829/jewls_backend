const mongoose = require("mongoose");

const couponUsageSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },          // coupon code
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalBeforeDiscount: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    totalAfterDiscount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CouponUsage", couponUsageSchema);