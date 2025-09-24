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
      .populate("user", "name email")   // populate user details
      .populate("items.product", "name price imageUrl"); // populate product details

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
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


exports.UpdateOrderStatus=async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status (must be one of enum values)
    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
}
