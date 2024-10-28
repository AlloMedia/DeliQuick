const Restaurant = require("../../models/restaurantModel");
const Category = require("../../models/categoryModel");
const Item = require("../../models/itemModel");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const jwt = require("jsonwebtoken");

const addMenuItem = async (req, res) => {
  try {
    const { name, description, stock, price, image, categoryId, restaurantId } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image ||
      !categoryId ||
      !restaurantId ||
      !stock
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const item = new Item({
      name,
      description,
      price,
      stock,
      image,
      category: categoryId,
      restaurant: restaurantId,
    });

    await item.save();
    return res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editMenuItem = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      stock,
      price,
      image,
      categoryId,
      restaurantId,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (restaurantId) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      item.restaurant = restaurantId;
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      item.category = categoryId;
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (price) item.price = price;
    if (stock) item.stock = stock;
    if (image) item.image = image;

    await item.save();
    return res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id, token } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      userId = decoded.userId;
      console.log("Decoded:", decoded);
    } catch (err) {
      console.log("JWT Decode Error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRole = await Role.findById(user.role);
    if (!userRole || userRole.name !== "manager") {
      console.log("Unauthorized");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Item.findByIdAndDelete(id); // Use findByIdAndDelete to remove the item
    console.log("Item removed:", item);
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  getAllCategories,
};
