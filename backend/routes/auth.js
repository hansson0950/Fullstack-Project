const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signale = require("signale");
require("dotenv").config();

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
        res.json({ user: user._id, redirect: "../home", token });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is not found" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid Password" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header("auth-token", token).json({ token, redirect: "../home" });

    signale.complete("Login Successful")
});

module.exports = router;