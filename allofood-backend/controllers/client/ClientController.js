const Order = require("../../models/orderModel");
const Item = require("../../models/itemModel");

// Create order for a client
exports.createOrder = async (req, res) => {
  try {
    // Extract authenticated user's ID from authMiddleware
    const userId = req.user._id;  // user is added by authMiddleware

    const { items } = req.body;

    // Validate items
    const itemIds = items.map((item) => item.itemId);
    const foundItems = await Item.find({ _id: { $in: itemIds }, stock: { $gte: 1 } });

    if (foundItems.length !== items.length) {
      return res.status(400).json({ message: "Some items were not found or are out of stock" });
    }

    // Calculate total price
    const totalPrice = items.reduce((acc, item) => {
      const foundItem = foundItems.find((i) => i._id.equals(item.itemId));
      return acc + foundItem.price * item.quantity;
    }, 0);

    // Deduct stock for each item
    for (let item of items) {
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
    res.status(500).json({ message: "Server error" });
  }
};
