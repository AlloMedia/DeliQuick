const Inbox = require("../models/inboxModel");
const User = require("../models/userModel");

module.exports = async () => {
    try {
        await Inbox.deleteMany({});

        // Fetch users by their names
        const userNames = ["Manager", "Client", "Delivery"];
        const users = await User.find({ name: { $in: userNames } });

        if (users.length !== userNames.length) {
            throw new Error("Some users were not found");
        }

        const inboxMessages = [
            {
                user: users[0]._id,
                message: "Hello, how are you?",
                status: false,
            },
            {
                user: users[1]._id,
                message: "I'm good, thank you!",
                status: true,
            },
            {
                user: users[2]._id,
                message: "What's up?",
                status: false,
            },
        ];

        await Promise.all(inboxMessages.map(inboxMessage => Inbox.create(inboxMessage)));

        console.log("Inbox messages seeded successfully");
    } catch (error) {
        console.error("Error seeding inbox messages:", error);
    }
};