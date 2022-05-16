const router = require("express").Router();
const path = require("path");
const Message = require('../models/Message');

router.get("/home", (req, res) => {
    res.sendFile(path.resolve("frontend/index.html"))
})

router.get("/about", (req, res) => {
    res.sendFile(path.resolve("frontend/about/index.html"))
})

router.get("/contact", (req, res) => {
    res.sendFile(path.resolve("frontend/contact/index.html"))
})

router.post("/contact", (req, res) => {

    const data = new Message({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        message: req.body.message

    })
    data.save();
    res.redirect('/contact');
})

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("frontend/login/index.html"))
})

router.get("/register", (req, res) => {
    res.sendFile(path.resolve("frontend/register/index.html"))
})

module.exports = router;