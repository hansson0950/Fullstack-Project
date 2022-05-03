const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 15
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 15
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    country: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Message", messageSchema);