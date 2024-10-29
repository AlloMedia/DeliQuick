const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const Restaurant = require("../models/restaurantModel");

module.exports = async () => {
    try {
        await Item.deleteMany({});
        
        // Assuming you have predefined category and restaurant IDs
        const category = await Category.findOne({ name: "drinks" });

        const restaurantNames = ["Restaurant 1", "Restaurant 2"];
        const restaurants = await Restaurant.find({ name: { $in: restaurantNames } });

        const items = [
            {
                name: "Coca Cola",
                category: category._id,
                price: 1.5,
                stock: 100,
                description: "Refreshing beverage",
                restaurant: restaurants[0]._id,
                status: 'available'
            },
            {
                name: "Burger",
                category: category._id,
                price: 5.0,
                stock: 50,
                description: "Delicious beef burger",
                restaurant: restaurants[1]._id,
                status: 'available'
            },
            {
                name: "Chips",
                category: category._id,
                price: 2.0,
                stock: 200,
                description: "Crispy potato chips",
                restaurant: restaurants[1]._id,
                status: 'available'
            },
            {
                name: "Ice Cream",
                category: category._id,
                price: 3.0,
                stock: 80,
                description: "Creamy vanilla ice cream",
                restaurant: restaurants[1]._id,
                status: 'available'
            },
        ];

        for (let item of items) {
            await Item.create(item);
        }
        console.log("Items seeded successfully");
    } catch (error) {
        console.error("Error seeding items:", error);
    }
};