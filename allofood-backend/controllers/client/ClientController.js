const mongoose = require('mongoose');
const Order = require("../../models/orderModel");
const Item = require("../../models/itemModel");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure that req.user is populated via authMiddleware
    const { items } = req.body;

    // Ensure the items array is not empty
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided in the order" });
    }

    // Convert itemId strings to ObjectId
    const itemIds = items.map((item) => mongoose.Types.ObjectId(item.itemId));

    // Find items that match the provided IDs and are in stock
    const foundItems = await Item.find({
      _id: { $in: itemIds },
      stock: { $gte: 1 }, // Ensure items are in stock
    });

    if (!foundItems || foundItems.length === 0) {
      return res.status(404).json({ message: "Items not found or out of stock" });
    }

    if (foundItems.length !== items.length) {
      return res.status(400).json({ message: "Some items were not found or are out of stock" });
    }

    // Calculate total price and check stock availability
    let totalPrice = 0;
    for (const item of items) {
      const foundItem = foundItems.find((i) => i._id.equals(item.itemId));
      if (!foundItem || foundItem.stock < item.quantity) {
        return res.status(400).json({
          message: `Item ${item.itemId} is out of stock or insufficient quantity`,
        });
      }
      totalPrice += foundItem.price * item.quantity;
    }

    // Update stock for each item
    for (const item of items) {
      const foundItem = foundItems.find((i) => i._id.equals(item.itemId));
      foundItem.stock -= item.quantity;
      await foundItem.save();
    }

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: items.map((item) => ({
        item: item.itemId,
        quantity: item.quantity,
        price: foundItems.find((i) => i._id.equals(item.itemId)).price,
      })),
      totalPrice,
      status: "Pending", // Default status for new orders
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
