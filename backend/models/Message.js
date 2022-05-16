const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
        required: true,
        min: 4
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Message", messageSchema);