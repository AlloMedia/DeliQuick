const Order = require('../../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        // const deliveryId = req.user._id;

        // const orders = await Order.find({ 
        //         status: 'Ready',
        //         notifiedDeliveryPeople: { $in: [deliveryId] }
        //     })
        //     .populate('user', 'name email address')
        //     .populate({
        //         path: 'items.item',
        //         select: 'name price'
        //     })
        //     .sort({ createdAt: -1 });

        // res.status(200).json(orders);
        console.log('get all orders');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

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