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

    // Send email notifications with token
    const emailPromises = availableDeliveryPeople.map((deliveryPerson) =>
        mailDelivery(
        deliveryPerson.email,
        "New Order Available",
        order._id,
        deliveryPerson._id
      )
    );

    await Promise.all(emailPromises);

    console.log(
      `Notified ${availableDeliveryPeople.length} delivery people for order ${orderId}`
    );

    return availableDeliveryPeople;
  } catch (error) {
    console.error(`Error notifying delivery people for order ${orderId}:`, error);
    throw error;
  }
};

module.exports = {
  notifyDelivery,
};
