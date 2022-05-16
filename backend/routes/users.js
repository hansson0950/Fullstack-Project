const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

module.exports = router;