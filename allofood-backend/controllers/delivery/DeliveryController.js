const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const { mailDelivery } = require("../../helpers/mailDelivery");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

const acceptDelivery = async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(401).json({ error: "Access denied" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { orderId, deliveryPersonId } = decoded;

    const order = await Order.findById(orderId).session(session);
    if (!order || order.status !== "Ready") {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ error: "Order not available for acceptance" });
    }

    if (!order.notifiedDeliveryPeople.includes(deliveryPersonId)) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ error: "You were not notified about this order" });
    }

    order.deliveryPerson = deliveryPersonId;
    order.status = "Assigned";
    order.deliveryAssignedAt = new Date();
    order.notifiedDeliveryPeople = [];
    await order.save({ session });

    await User.findByIdAndUpdate(deliveryPersonId, {
      isAvailable: false,
    }).session(session);

    await session.commitTransaction();

    // Send confirmation email to the delivery person
    const deliveryPerson = await User.findById(deliveryPersonId);
    await mailDelivery(
      deliveryPerson.email,
      "Order Assigned",
      orderId,
      deliveryPersonId
    );

    res.status(200).json({ message: "Delivery accepted successfully", order });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  } finally {
    session.endSession();
  }
};

module.exports = {
  notifyDelivery,
  acceptDelivery,
};