const mongoose = require("mongoose");
const Restaurant = require("../../models/restaurantModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const rejectOrAcceptRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }

    const isAproved = req.body.isAproved;

    // console.log(
    //   `Updating restaurant ${restaurantId} to isAproved: ${isAproved}`
    // );

    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { isAproved: isAproved },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      message: `Restaurant ${isAproved ? "approved" : "rejected"} successfully`,
      restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant introuvable." });
    }
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
// Ajouter un nouveau restaurant
const addRestaurant = async (req, res) => {
  try {
    const superAdminId = "671f4ed7e74bd1a55164d28e";

    const { user, name, description, address, phone, status, isApproved } =
      req.body;

    if (user !== superAdminId) {
      return res.status(403).json({
        message:
          "Accès interdit. Vous n'êtes pas autorisé à ajouter des restaurants.",
      });
    }

    const images = {
      banner:
        req.files && req.files["banner"] ? req.files["banner"][0].path : "",
      profileImage:
        req.files && req.files["profileImage"]
          ? req.files["profileImage"][0].path
          : "",
      slides:
        req.files && req.files["slides"]
          ? req.files["slides"].map((file) => file.path)
          : [],
    };

    if (!images.banner || !images.profileImage || images.slides.length === 0) {
      return res.status(400).json({
        message:
          "Les images du restaurant sont requises (banner, profileImage, et au moins une slide).",
      });
    }

    const restaurantData = {
      name,
      description,
      user,
      images,
      address,
      phone,
      status,
      isApproved,
    };

    const newRestaurant = new Restaurant(restaurantData);
    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant ajouté avec succès.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ message: "Données invalides.", errors: error.errors });
    }
    console.error("Erreur lors de l'ajout du restaurant:", error);
    res
      .status(500)
      .json({ message: "Erreur interne du serveur.", error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the restaurant" });
  }
};

const editRestaurant = async (req, res) => {
  try {
    const superAdminId = "671f4ed7e74bd1a55164d28e";

    const { restaurantId } = req.params;
    const {
      user,
      name,
      description,
      images,
      address,
      phone,
      status,
      isApproved,
    } = req.body;

    if (user !== superAdminId) {
      return res.status(403).json({
        message:
          "Accès interdit. Vous n'êtes pas autorisé à modifier ce restaurant.",
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { name, description, images, address, phone, status, isApproved },
      { new: true, runValidators: true }
    );

    // If the restaurant does not exist, return a 404 error
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant introuvable." });
    }

    // Respond with the updated restaurant information
    res.status(200).json({
      message: "Restaurant mis à jour avec succès.",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ message: "Données invalides.", errors: error.errors });
    }
    console.error("Erreur lors de la modification du restaurant:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Search for restaurants by name
const searchRestaurants = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un terme de recherche." });
    }

    // Search for restaurants by name or address matching the query
    const searchRegex = new RegExp(query, "i");
    const restaurants = await Restaurant.find({
      $or: [{ name: searchRegex }, { address: searchRegex }],
    });

    if (restaurants.length === 0) {
      return res.status(404).json({
        message:
          "Aucun restaurant trouvé correspondant aux critères de recherche.",
      });
    }
    res
      .status(200)
      .json({ message: "Restaurants trouvés avec succès.", restaurants });
  } catch (error) {
    console.error("Erreur lors de la recherche des restaurants:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const getRestaurantDetails = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.images.banner = `/${restaurant.images.banner}`;
    restaurant.images.profileImage = `/${restaurant.images.profileImage}`;
    restaurant.images.slides = restaurant.images.slides.map(
      (image) => `/${image}`
    );

    res.status(200).json({
      message: "Restaurant details fetched successfully.",
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  rejectOrAcceptRestaurant,
  addRestaurant,
  upload: upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "slides", maxCount: 10 },
  ]),
  editRestaurant,
  searchRestaurants,
  deleteRestaurant,
  getRestaurantById,
  getRestaurantDetails,
};
