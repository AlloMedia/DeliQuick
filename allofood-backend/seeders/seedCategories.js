const Category = require("../models/categoryModel");

module.exports = async () => {
  try {
    await Category.deleteMany({});
    const categories = [
      { name: "drinks" },
      { name: "food" },
      { name: "snacks" },
      { name: "desserts" },
    ];
    for (let category of categories) {
      await Category.create(category);
    }
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};