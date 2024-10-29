const Restaurant = require("../../models/restaurantModel");

const getApprovedRestaurants = async (req, res) => {
  try {
    const approvedRestaurants = await Restaurant.find({ isAproved: true });
    return res.status(200).json(approvedRestaurants);
  } catch (error) {
    console.error("Error fetching approved restaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUnapprovedRestaurants = async (req, res) => {
  try {
    const unapprovedRestaurants = await Restaurant.find({ isAproved: false });
    return res.status(200).json(unapprovedRestaurants);
  } catch (error) {
    console.error("Error fetching unapproved restaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching all restaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getApprovedRestaurants,
  getUnapprovedRestaurants,
  getAllRestaurants,
};
