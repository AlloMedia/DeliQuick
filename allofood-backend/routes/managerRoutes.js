const managerController = require("../controllers/manager/ManagerController");
const orderController = require("../controllers/manager/OrderController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

const express = require("express");
const router = express.Router();

router.get("/orders", tokenMiddleware, orderController.getAllOrders);
router.put("/orders/:id", tokenMiddleware, orderController.updateOrderStatus);

// Routes for the Menu Items CRUD operations
router.post("/items/create", managerController.addMenuItem);
router.put("/items/edit", managerController.editMenuItem);
router.delete("/items/delete/:id/:token", managerController.deleteMenuItem);
router.get("/categories", managerController.getAllCategories);

module.exports = router;
