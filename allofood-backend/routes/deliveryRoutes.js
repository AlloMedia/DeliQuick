const deliveryController = require("../controllers/delivery/DeliveryController");
const orderController = require("../controllers/delivery/OrderController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

const express = require("express");
const router = express.Router();

router.get("/requests", tokenMiddleware, orderController.getAllRequests);
router.get("/orders", tokenMiddleware, orderController.getAllOrders);
router.put("/orders/:orderId", tokenMiddleware, orderController.updateOrderStatus);
router.put("/accept-request", tokenMiddleware, deliveryController.acceptDelivery);
// router.get("/me", [''], deliveryController.acceptDelivery);

module.exports = router;