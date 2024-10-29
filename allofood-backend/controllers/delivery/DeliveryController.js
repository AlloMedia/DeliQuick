const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const { mailDelivery } = require("../../helpers/mailDelivery");

const notifyDelivery = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== "Ready") {
      throw new Error("Order not found or not ready for delivery");
    }

    // Find the ObjectId for the "delivery" role
    const deliveryRole = await Role.findOne({ name: "delivery" });
    if (!deliveryRole) {
      throw new Error("Delivery role not found");
    }

    // Find available delivery people
    const availableDeliveryPeople = await User.find({
      role: deliveryRole._id,
      isAvailable: true,
    }).limit(5);

    // Update the order with notified delivery people
    order.notifiedDeliveryPeople = availableDeliveryPeople.map((dp) => dp._id);
    await order.save();

    // Send email notifications to delivery people
    const emailPromises = availableDeliveryPeople.map((deliveryPerson) =>
      mailDelivery(deliveryPerson.email, "New Order Available")
    );

    await Promise.all(emailPromises);

    console.log(
      `Notified ${availableDeliveryPeople.length} delivery people for order ${orderId}`
    );

    return availableDeliveryPeople;
  } catch (error) {
    console.error(
      `Error notifying delivery people for order ${orderId}:`,
      error
    );
    throw error;
  }
};

const acceptDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;
    const deliveryId = req.user.userId;
    
    console.log('orderId:', orderId, 'deliveryId:', deliveryId);

    const order = await Order.findById(orderId);
    if (!order || order.status !== "Ready") {
      return res.status(400).json({ error: "Order not available for acceptance" });
    }

    console.log('order:', order);

    if (!order.notifiedDeliveryPeople.includes(deliveryId)) {
      return res.status(403).json({ error: "Not authorized to perform this action" });
    }

    order.deliveryPerson = deliveryId;
    order.status = "Assigned";
    order.deliveryAssignedAt = new Date();
    order.notifiedDeliveryPeople = [];
    await order.save();

    await User.findByIdAndUpdate(deliveryId, {
      isAvailable: false,
    });

    res.status(200).json({ message: "Delivery accepted successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  notifyDelivery,
  acceptDelivery,
};