const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");

module.exports = async () => {  
    try {
        await Restaurant.deleteMany({});
        
        // Fetch users by their names
        const userNames = ["Manager", "Client", "Delivery"];
        const users = await User.find({ name: { $in: userNames } });        

        if (users.length !== userNames.length) {
            throw new Error("Some users were not found");
        }

        const restaurants = [
            {
                name: "Restaurant 1",
                description: "Restaurant 1 description",
                user: users[0]._id,
                images: {
                    banner: "banner.jpg",
                    profileImage: "profile.jpg",
                    slides: ["slide1.jpg", "slide2.jpg"],
                },
                address: "123 Main St",
                phone: "0123456789",
                status: "open",
                isAproved:false

            },
            {
                name: "Restaurant 2",
                description: "Restaurant 2 description",
                user: users[1]._id,
                images: {
                    banner: "banner.jpg",
                    profileImage: "profile.jpg",
                    slides: ["slide1.jpg", "slide2.jpg"],
                },
                address: "456 Main St" ,           
                phone: "0123456789",
                status: "open",
                isAproved:false

            },
        ];
        await Restaurant.insertMany(restaurants);
        console.log("Restaurants seeded successfully");
    }
    catch (error) {
        console.error("Error seeding restaurants:", error);
    }
};