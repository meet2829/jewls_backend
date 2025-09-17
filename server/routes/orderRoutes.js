const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

// Place order
router.post("/orders", orderController.createOrder);
module.exports = router;
