const Restaurant = require("../../models/restaurantModel");
const Category = require("../../models/categoryModel");
const Item = require("../../models/itemModel");

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
    const { id } = req.params;
    const { name, description, stock, price, image, categoryId, restaurantId } =
      req.body;

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

module.exports = { addMenuItem, editMenuItem, deleteMenuItem };
