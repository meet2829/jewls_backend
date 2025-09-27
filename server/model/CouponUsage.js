const mongoose = require("mongoose");

const couponUsageSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, 
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    totalBeforeDiscount: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    totalAfterDiscount: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CouponUsage", couponUsageSchema);