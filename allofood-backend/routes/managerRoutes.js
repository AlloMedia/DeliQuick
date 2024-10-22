const managerController = require("../controllers/manager/ManagerController");
const orderController = require("../controllers/manager/OrderController");

const express = require("express");
const router = express.Router();

router.get("/orders", orderController.getAllOrders);
router.put("/orders/:id", orderController.updateOrderStatus);
router.post("/items/create", managerController.addMenuItem);
router.put("/items/edit/:id", managerController.editMenuItem);

module.exports = router;
