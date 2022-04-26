const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);