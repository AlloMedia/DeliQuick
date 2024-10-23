const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client/clientController");
const authMiddleware = require("../middlewares/authMiddleware");  
router.post("/order", authMiddleware, clientController.createOrder);


module.exports = router;