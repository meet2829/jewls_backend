const Order = require("../model/order");

exports.createOrder = async (req, res) => {
  try {
    const { user, userName, items, total } = req.body;
    console.log("Incoming order:", req.body);

    if (!user || !userName || !items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      user,
      userName,
      items,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order", error });
  }
  
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // populate user details
      .populate("items.product", "name price"); // populate product details
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get single order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price imageUrl");

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};
