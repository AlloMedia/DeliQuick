const Item = require('../../models/itemModel');
const Order = require('../../models/orderModel');
const Restaurant = require('../../models/restaurantModel');
const User = require('../../models/userModel');
const { notifyDelivery } = require('../delivery/DeliveryController');

const getAllOrders = async (req, res) => {
  try {
      const managerId = req.user.userId;
      console.log('managerId:', managerId);
 
      const restaurant = await Restaurant.findOne({ user: managerId });
      
      if (!restaurant) {
        return res.status(404).json({ 
          message: 'No restaurant found for this manager' 
        });
      }

      const items = await Item.find({ restaurant: restaurant._id });
      
      if (!items.length) {
          return res.status(200).json({
              message: 'No items found for this restaurant',
              orders: []
          });
      }

      const orders = await Order.find({
          'items.item': { $in: items.map(item => item._id) }
      })
      .populate('user', 'name email')
      .populate({
          path: 'items.item',
          select: 'name price restaurant'
      })
      .sort({ createdAt: -1 });

      res.status(200).json(orders);

  } catch (error) {
      console.error('Error fetching restaurant orders:', error);
      res.status(500).json({ 
          success: false,
          message: 'Error fetching restaurant orders', 
          error: error.message 
      });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const managerId = req.user.userId;

    // Fetch the user and their role
    const user = await User.findById(managerId).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    
    const userRole = user.role.name;
    const userRestaurant = await Restaurant.findOne({ user: managerId });

    // Fetch the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('restaurant mana:', userRestaurant.user);
    console.log("order", order)
    

    // Check permissions
    if (userRole !== 'manager' && userRestaurant.user.toString() !== managerId) {
      return res.status(403).json({
        message: 'Not authorized to update this order',
      });
    }

    // Update order status
    order.status = status;
    await order.save();

    // Notify delivery people if the status is 'Ready'
    if (status === 'Ready') {
      await notifyDelivery(order._id);
      console.log('Notified delivery people');
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus
};