// const express = require("express");
// const router = express.Router();
// const orderController = require("../controller/orderController");
// const { getOrders, getOrderDetails, } = require("../controller/orderController");

// router.get("/", getOrders); 
// router.get("/:id", getOrderDetails); 

// router.post("/", orderController.createOrder);

// router.put("/:id",orderController.UpdateOrderStatus)

// module.exports = router;

// routes/order.js

const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/", orderController.getOrders); 
router.get("/:id", orderController.getOrderDetails); 
router.post("/", orderController.createOrder);
router.put("/:id", orderController.UpdateOrderStatus);
router.put("/:id/payment", orderController.updatePaymentStatus); // New route

module.exports = router;
