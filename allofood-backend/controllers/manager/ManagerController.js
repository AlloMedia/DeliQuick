const fs = require("fs");
const Restaurant = require("../../models/restaurantModel");
const Category = require("../../models/categoryModel");
const Item = require("../../models/itemModel");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const Order = require("../../models/orderModel");
const jwt = require("jsonwebtoken");
const path = require("path");

const addMenuItem = async (req, res) => {
  try {
    const { name, description, stock, price, categoryId, restaurantId, image } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image || // Check for the base64 image data
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

    // Decode base64 image data
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: "Invalid image data" });
    }

    const imageBuffer = Buffer.from(matches[2], "base64");
    const imageName = `${Date.now()}.png`; // You can change the extension based on the image type
    const imagePath = path.join(__dirname, "../../uploads", imageName);

    // Save the image to the /uploads folder
    fs.writeFileSync(imagePath, imageBuffer);

    const item = new Item({
      name,
      description,
      price,
      stock,
      image: `/uploads/${imageName}`,
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
      categoryId,
      restaurantId,
      image, // Base64 image string
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

    if (image) {
      // Decode base64 image and save to /uploads folder
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const filename = `${Date.now()}.png`; // You can change the extension based on the image type
      const filepath = path.join(__dirname, "../../uploads", filename);

      fs.writeFileSync(filepath, buffer);
      item.image = `/uploads/${filename}`; // Update the image path
    }

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

const getImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../../uploads", filename);

  if (fs.existsSync(imagePath)) {
    return res.sendFile(imagePath);
  } else {
    return res.status(404).json({ message: "Image not found" });
  }
};

const getStats = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("Token:", token);
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      userId = decoded.userId;
      console.log("Decoded:", decoded);
    } catch (err) {
      console.log("JWT Decode Error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
    const restaurant = await Restaurant.findOne({ user: userId });
    const restaurantId = restaurant.id;

    const items = await Item.find({ restaurant: restaurantId }).select("_id");
    const totalItems = items.length;
    const itemIds = items.map((item) => item._id);

    const ordersCount = await Order.countDocuments({
      "items.item": { $in: itemIds },
    });
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered", // Ensure the status matches the enum value in your schema
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$totalPrice" }, // Use the correct field name
        },
      },
    ]);

    const totalUniqueCustomers = await Order.distinct("user", {
      restaurant: restaurantId,
    });

    const totalIncome =
      totalRevenue.length > 0 ? totalRevenue[0].totalIncome : 0;

    return res.status(200).json({
      totalItems,
      totalIncome,
      ordersCount,
      restaurant,
      totalUniqueCustomers: totalUniqueCustomers.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  getAllCategories,
  getImage,
  getStats,
};
