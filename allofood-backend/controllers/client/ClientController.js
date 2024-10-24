const Order = require('../../models/orderModel');
const Item = require('../../models/itemModel');
const User = require('../../models/userModel'); 
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryPerson, address, userId } = req.body;
    
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please ensure you are properly authenticated.' });
    }
    
    // Validate delivery person if provided
    if (deliveryPerson) {
      const deliveryPersonExists = await User.findById(deliveryPerson);
      if (!deliveryPersonExists) {
        return res.status(404).json({ message: 'Specified delivery person not found' });
      }
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one item in the order' });
    }

    // Validate address
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ message: 'Please provide a valid delivery address' });
    }

    let totalPrice = 0;
    const orderItems = [];
    const itemUpdates = [];

    // Process all items
    for (let itemObj of items) {
      const { itemId, quantity } = itemObj;

      // Validate item input
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: `Invalid item ID format: ${itemId}` });
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: `Invalid quantity for item ${itemId}. Must be a positive integer.` });
      }

      // Fetch the item
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: `Item with ID ${itemId} does not exist.` });
      }

      if (item.stock < quantity) {
        return res.status(400).json({ message: `Not enough stock for item ${item.name}. Available: ${item.stock}, Requested: ${quantity}.` });
      }

      const priceForItem = item.price * quantity;
      orderItems.push({
        item: item._id,
        quantity: quantity,
        price: item.price,
        name: item.name
      });

      // Add to item updates array instead of updating immediately
      itemUpdates.push({
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { stock: -quantity } }
        }
      });

      totalPrice += priceForItem;
    }

    // Bulk update all items
    await Item.bulkWrite(itemUpdates);

    // Create the order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice: totalPrice,
      deliveryPerson: deliveryPerson || null,
      notifiedDeliveryPeople: [],
      status: 'Pending',
      address: address.trim(),
      createdAt: new Date()
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: newOrder._id,
        totalPrice: newOrder.totalPrice,
        status: newOrder.status,
        items: newOrder.items,
        address: newOrder.address,
        createdAt: newOrder.createdAt
      }
    });

  } catch (error) {
    console.error('Error placing order:', error);

    return res.status(500).json({
      message: 'Internal server error while placing order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
    });
  }
};
