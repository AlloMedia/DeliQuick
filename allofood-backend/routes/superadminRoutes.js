const RestaurantController = require("../controllers/superAdmin/RestaurantController");
const superAdminController = require("../controllers/superAdmin/SuperAdminController");
const express = require("express");
const router = express.Router();
const {
  addRestaurant,
  upload,
} = require("../controllers/superAdmin/SuperAdminController");

router.post("/add", upload, addRestaurant);
router.put("/edit/:restaurantId", upload, superAdminController.editRestaurant);
router.get("/search", superAdminController.searchRestaurants);
router.get("/restaurant/:restaurantId", superAdminController.getRestaurantById);
router.get(
  "/restaurants/:restaurantId",
  superAdminController.getRestaurantDetails
);

// Route for rejecting or accepting a restaurant
router.put(
  "/restaurants/reject-or-accept/:restaurantId",
  superAdminController.rejectOrAcceptRestaurant
);

router.delete(
  "/restaurants/:restaurantId",
  superAdminController.deleteRestaurant
);

module.exports = router;
