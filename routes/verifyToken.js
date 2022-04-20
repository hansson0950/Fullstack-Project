const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth.token");
    if (!token) return res.status(401).json("Access Denied");

    try {
        console.log(token);
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json("Invalid Token")
    }
}