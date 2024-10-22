const clientController = require("../controllers/client/clientController");
const authMiddleware = require("../middlewares/authMiddleware");  // Assuming you have this implemented

const express = require("express");
const router = express.Router();

router.post("/order", authMiddleware, clientController.createOrder);


module.exports = router;