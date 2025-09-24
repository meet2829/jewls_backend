const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { getOrders, getOrderDetails, } = require("../controller/orderController");

router.get("/", getOrders); // GET all orders
router.get("/:id", getOrderDetails); // GET single order details

// Place order
router.post("/", orderController.createOrder);


router.put("/:id",orderController.UpdateOrderStatus)

module.exports = router;
