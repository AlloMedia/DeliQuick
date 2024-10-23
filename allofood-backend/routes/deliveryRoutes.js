const deliveryController = require("../controllers/delivery/DeliveryController");

const express = require("express");
const router = express.Router();

router.post("/accept", deliveryController.acceptDelivery);
// router.get("/me", [''], deliveryController.getDelivery);

module.exports = router;