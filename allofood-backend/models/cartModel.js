// models/Cart.js
const mongoose = require('mongoose');
const Item = require('./itemModel');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a User model, if you have one
        required: true
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
                validate: {
                    validator: async function (itemId) {
                        const item = await Item.findById(itemId);
                        return item != null && item.status === 'available';
                    },
                    message: "Item does not exist or is unavailable",
                },
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ],
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
