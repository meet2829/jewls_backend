const Order = require("../model/order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, cart, totalAmount } = req.body;

    if (!userId || !cart || cart.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId,
      items: cart,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};
