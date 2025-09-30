// controller/orderController.js
const Order = require("../model/order");
const Product=require("../model/product")

exports.createOrder = async (req, res) => {
  try {
    const { user, userName, items, total, couponCode, discountAmount } = req.body;
    console.log("Incoming order:", req.body);

    if (!user || !userName || !items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid order data" });
    }

//  Check stock before creating order
    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (product.Stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.Stock}` 
        });
      }
    }

        // Create order
    const newOrder = new Order({
      user,
      userName,
      items,
      total,
      couponCode: couponCode || null,
      discountAmount: discountAmount || 0,
      status: "Pending",
      paymentStatus: "pending"
    });

    await newOrder.save();
    
     // ✅ Step 3: Reduce stock after order is created

     for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { Stock: -item.quantity } } // reduce stock
      );
    }
    
    // Populate the saved order before sending response
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "name email")
      .populate("items.product", "name price imageUrl");

    res.status(201).json({ 
      message: "Order created successfully", 
      order: populatedOrder 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

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

exports.UpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email")
     .populate("items.product", "name price imageUrl");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// New method to update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, paymentStatus } = req.body;

    const updateData = {
      paymentStatus,
      ...(paymentId && { paymentId }),
      ...(paymentStatus === 'paid' && { paidAt: new Date() })
    };

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("user", "name email")
     .populate("items.product", "name price imageUrl");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ message: "Server error" });
  }
}