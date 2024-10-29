const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client/ClientController");
const RestaurantController = require("../controllers/superAdmin/RestaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

// Define routes using imported functions directly
router.post("/order", clientController.createOrder); // Use createOrder directly
router.get("/search", clientController.searchRestaurants);
router.post("/create", clientController.createOrder);
router.get("/search-restaurants", clientController.searchRestaurants);
router.get("/items", clientController.getAllItems);
router.get("/user/:userId", clientController.getUserOrders);
// router.get("/orders/:orderId/track", clientController.trackOrder);
router.get("/allItems", clientController.getAllItems);
router.post("/add", clientController.addItemToCart);
router.get(
  "/restaurant/unapproved",
  RestaurantController.getUnapprovedRestaurants
);
router.get("/restaurants", RestaurantController.getAllRestaurants);
router.get(
  "/restaurants/approved",
  RestaurantController.getApprovedRestaurants
);

module.exports = router;
