const managerController = require("../controllers/manager/ManagerController");
const orderController = require("../controllers/manager/OrderController");

const express = require("express");
const router = express.Router();

router.get("/orders", orderController.getAllOrders);

module.exports = router;