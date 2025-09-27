const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "flat"], required: true },
  discountValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usedCount: { type: Number, default: 0 },// to track usage
  usedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "u   ser" },
      amount: Number, 
      date: { type: Date, default: Date.now }
    }
  ]
});
module.exports = mongoose.model("Coupon", couponSchema);