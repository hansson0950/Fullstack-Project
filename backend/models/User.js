const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);