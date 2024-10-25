const deliveryController = require("../controllers/delivery/DeliveryController");
const orderController = require("../controllers/delivery/OrderController");

const express = require("express");
const router = express.Router();

router.get("/requests", orderController.getAllRequests);
router.get("/orders", orderController.getAllOrders);
router.put("/orders/:id", orderController.updateOrderStatus);
router.put("/accept-request", deliveryController.acceptDelivery);
// router.get("/me", [''], deliveryController.acceptDelivery);

module.exports = router;