const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client/ClientController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/order", authMiddleware, clientController.createOrder);
router.get("/search", clientController.searchRestaurants);
router.get("/allItems", clientController.getAllItems);
router.post("/add", clientController.addItemToCart);

// router.post('/order', authMiddleware, clientController.createOrder);

module.exports = router;
