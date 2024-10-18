const express = require('express');
const { rejectOrAcceptRestaurant } = require('../controllers/superadmin/superAdminController');  
const { getUnapprovedRestaurants } = require("../controllers/superadmin/restaurantController");
const router = express.Router();

// Route for rejecting or accepting a restaurant
router.put('/restaurants/reject-or-accept/:restaurantId', rejectOrAcceptRestaurant);
router.get('/Restaurant/unapproved', getUnapprovedRestaurants);



module.exports = router;
