const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client/ClientController");
const authMiddleware = require("../middlewares/authMiddleware");

// Import trackOrder
const { trackOrder } = require("../controllers/client/ClientController");

router.post("/order", authMiddleware, clientController.createOrder);
router.get('/search', clientController.searchRestaurants);
router.get('/orders/:orderId/track', authMiddleware, trackOrder);

module.exports = router;
