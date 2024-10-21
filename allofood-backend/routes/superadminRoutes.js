const superAdminController = require("../controllers/superAdmin/SuperAdminController");
const RestaurantController = require("../controllers/superAdmin/RestaurantController");
const express = require("express");
const router = express.Router();

router.post("/add", superAdminController.addRestaurant);

// Route for rejecting or accepting a restaurant
router.put(
  "/restaurants/reject-or-accept/:restaurantId",
  superAdminController.rejectOrAcceptRestaurant
);
router.get(
  "/Restaurant/unapproved",
  RestaurantController.getUnapprovedRestaurants
);
router.get(
  '/restaurants', RestaurantController.getAllRestaurants);

router.delete(
  '/restaurants/:restaurantId', superAdminController.deleteRestaurant);

module.exports = router;
