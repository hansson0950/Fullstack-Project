const express = require("express");
const signale = require("signale");
const mongoose = require("mongoose");

const login = require("./routes/loginAuth");
const register = require("./routes/registerAuth");
const secureRoute = require("./routes/secure");
const pages = require("./routes/pages");
const products = require("./routes/products");
const users = require("./routes/users");

const PORT = process.env.PORT || 3000;
const app = express();

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success("Connected to database");
});

app.use(express.json());
app.use(express.static("frontend"));

app.use("/login/api/user", login);
app.use("/register/api/user", register);
app.use("/login/api/secure", secureRoute);
app.use("/", pages);
app.use("/api/products", products);
app.use("/api/users", users);

app.listen(PORT, () => {
    signale.info("Listening on port", PORT);
});