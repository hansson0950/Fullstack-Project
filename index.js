const express = require("express");
const signale = require("signale");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const secureRoute = require("./routes/secure");

const PORT = process.env.PORT || 3000;
const app = express();

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success("Connected to database");
});

app.use(express.json());
app.use(express.static("frontend"));

app.use("/api/user", authRoute);
app.use("/api/secure", secureRoute);

app.listen(PORT, () => {
    signale.info("Listening on port", PORT);
});