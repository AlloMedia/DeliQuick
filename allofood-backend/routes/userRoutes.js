const express = require("express");
const router = express.Router();
const { createOrder, searchRestaurants, getAllItems, getUserOrders } = require('../controllers/client/ClientController');
const authMiddleware = require("../middlewares/authMiddleware");

// Define routes using imported functions directly
router.post("/order", authMiddleware, createOrder);  // Use createOrder directly
router.get('/search', searchRestaurants);
router.post('/create', createOrder);
router.get('/search-restaurants', searchRestaurants);
router.get('/items', getAllItems);
router.get('/user/:userId', getUserOrders);

module.exports = router;
