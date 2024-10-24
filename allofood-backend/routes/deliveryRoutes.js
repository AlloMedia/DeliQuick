const deliveryController = require("../controllers/delivery/DeliveryController");
const orderController = require("../controllers/delivery/OrderController");

const express = require("express");
const router = express.Router();

router.get("/requests", orderController.getAllOrders);
router.post("/accept", deliveryController.acceptDelivery);
// router.get("/me", [''], deliveryController.getDelivery);

module.exports = router;