// const Order = require("../../models/orderModel");

// Import the Restaurant model (you might have a specific file for this model)
const Restaurant = require("../../models/restaurantModel");

const searchRestaurants = async (req, res) => {
  try {
    const { name, address } = req.query;

    if (!name && !address) {
      return res.status(400).json({ message: "Veuillez fournir un nom ou une adresse de restaurant à rechercher." });
    }
    
    const searchRestaurant = {};

    if (name) {
      searchRestaurant.name = { $regex: new RegExp(name, "i") };
    }

    if (address) {
      searchRestaurant.address = { $regex: new RegExp(address, "i") };
    }

    const restaurants = await Restaurant.find(searchRestaurant);

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "Aucun restaurant trouvé correspondant aux critères de recherche." });
    }
    
    res.status(200).json({ message: "Restaurants trouvés avec succès.", restaurants });
  } catch (error) {
    console.error("Erreur lors de la recherche des restaurants:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

module.exports = {
  searchRestaurants,
};
