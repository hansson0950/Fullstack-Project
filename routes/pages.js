const router = require("express").Router();
const path = require("path");

router.get("/home", (req, res) => {
    res.sendFile(path.resolve("frontend/index.html"))
})

router.get("/about", (req, res) => {
    res.sendFile(path.resolve("frontend/about/index.html"))
})

router.get("/contact", (req, res) => {
    res.sendFile(path.resolve("frontend/contact/index.html"))
})

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("frontend/login/index.html"))
})

module.exports = router;