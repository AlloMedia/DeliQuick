const mongoose = require("mongoose");
require("dotenv").config();

const seedRoles = require("./seedRoles");
const seedUsers = require("./seedUsers");
const seedInbox = require("./seedInbox");
const seedItems = require("./seedItems");
const seedOrders = require("./seedOrders");
const seedCategories = require("./seedCategories");
const seedRestaurants = require("./seedRestaurants");

const seedDatabase = async () => {
  try {
    const db = process.env.MONGODB_URI || "mongodb://localhost:27017/allo-db";
    await mongoose.connect(db);
    console.log("Connected to MongoDB");

    // Run seeders
    await seedRoles();
    await seedUsers();
    await seedCategories();
    await seedInbox();
    await seedRestaurants();
    await seedItems();
    await seedOrders();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedDatabase();
