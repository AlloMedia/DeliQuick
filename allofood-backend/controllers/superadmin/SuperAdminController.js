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



module.exports = { rejectOrAcceptRestaurant };
