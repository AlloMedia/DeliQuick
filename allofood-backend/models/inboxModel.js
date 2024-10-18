const mongoose = require('mongoose');
const User = require('./userModel');

const inboxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        validate: {
            validator: async function (userId) {
                const user = await User.findById(userId);
                return user != null;
            },
            message: "User does not exist sadly",
        },
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        enum: ["read", "unread"],
        default: "unread"
    }
},
{
    timestamps: true
});

const Inbox =  mongoose.model('Inbox', inboxSchema);

module.exports = Inbox;