const express = require("express");
const router = express.Router();
const clientController = require('../controllers/client/ClientController');
const authMiddleware = require("../middlewares/authMiddleware");

// Define routes using imported functions directly
router.post("/order", authMiddleware, clientController.createOrder);  // Use createOrder directly
router.get('/search', clientController.searchRestaurants);
router.post('/create', clientController.createOrder);
router.get('/search-restaurants', clientController.searchRestaurants);
router.get('/items', clientController.getAllItems);
router.get('/user/:userId', clientController.getUserOrders);
router.get('/orders/:orderId/track', authMiddleware, clientController.trackOrder);
router.get("/allItems", clientController.getAllItems);
router.post("/add", clientController.addItemToCart);

// router.post('/order', authMiddleware, clientController.createOrder);


module.exports = router;
