const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "flat"], required: true },
  discountValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usedCount: { type: Number, default: 0 },
  usedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // FIXED
      amount: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});
module.exports = mongoose.model("Coupon", couponSchema);