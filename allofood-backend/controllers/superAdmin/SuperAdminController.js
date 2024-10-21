const mongoose = require("mongoose");
const Restaurant = require("../../models/restaurantModel");



const rejectOrAcceptRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid restaurant ID format" });
        }

        const isAproved = req.body.isAproved; 

        console.log(`Updating restaurant ${restaurantId} to isAproved: ${isAproved}`); 

        const restaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { isAproved: isAproved },
            { new: true } 
        );

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: `Restaurant ${isAproved ? "approved" : "rejected"} successfully`, restaurant });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Error updating restaurant", error });
    }
};

// Ajouter un nouveau restaurant
exports.addRestaurant = async (req, res) => {
  try {
    // Use the actual SuperAdmin ID
    const superAdminId = "6712227016522097b4a45080"; 

    // Destructure necessary fields from the request body
    const { user, name, description, images, address, phone, status, isApproved } = req.body;

    // Check if the user making the request is the SuperAdmin
    if (user !== superAdminId) {
      return res.status(403).json({ message: "Accès interdit. Vous n'êtes pas autorisé à ajouter des restaurants." });
    }

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      description,
      user,
      images,
      address,
      phone,
      status,
      isApproved
    });

    // Save the restaurant to the database
    await newRestaurant.save();

    // Respond with the created restaurant information
    res.status(201).json({ message: "Restaurant ajouté avec succès.", restaurant: newRestaurant });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Données invalides.", errors: error.errors });
    }
    console.error("Erreur lors de l'ajout du restaurant:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


module.exports = { rejectOrAcceptRestaurant };