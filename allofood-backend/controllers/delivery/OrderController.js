const Order = require('../../models/orderModel');
const User = require('../../models/userModel');

const getAllRequests = async (req, res) => {
  try {
      const deliveryId = req.user.userId;

      const orders = await Order.find({ 
          status: 'Ready',
          notifiedDeliveryPeople: { $in: [deliveryId] }
      })
      .populate('user', 'name email address')
      .populate({
          path: 'items.item',
          select: 'name price'
      })
      .sort({ createdAt: -1 });

      res.status(200).json({
          success: true,
          data: orders,
          message: 'Requests fetched successfully'
      });
      
  } catch (error) {
      console.error('Error in getAllRequests:', error);
      res.status(500).json({ 
          success: false,
          error: 'Error fetching orders',
          message: error.message 
      });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 
      deliveryPerson: req.user.userId
    })
    .populate('user', 'name email address')
    .populate({
      path: 'items.item',
      select: 'name price'
    })
    .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Fetch the user with the populated role
    const user = await User.findById(userId).populate('role');
    const userRole = user.role.name;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check permissions
    if (userRole === 'delivery' && order.deliveryPerson.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order',
      });
    }

    order.status = status;
    await order.save();

    if (status === 'Delivered' || status === 'Rejected') {
      await User.findByIdAndUpdate(order.deliveryPerson, {
        isAvailable: true,
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating order',
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getAllRequests,
  updateOrderStatus
};