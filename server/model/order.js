// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
  },
  userName: { 
    type: String, 
    required: true 
  },
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    imageUrl: String,
    name: String,
    price: Number
  }],
  total: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending" 
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  paymentId: String,
  couponCode: String,
  discountAmount: {
    type: Number,
    default: 0
  },
  paidAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);