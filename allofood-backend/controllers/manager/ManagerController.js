const Restaurant = require("../../models/restaurantModel");
const Category = require("../../models/categoryModel");
const Item = require("../../models/itemModel");

// Ajouter un nouvel élément de menu
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

module.exports = { addMenuItem };
