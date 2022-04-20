const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);