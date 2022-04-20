const express = require("express");
const app = express();
const signale = require("signale");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

mongoose.connect("mongodb+srv://fullstack:project@mydatabase.4knzk.mongodb.net/FullstackProject?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    signale.success("Connected to database");
});

app.use(express.json());
app.use(express.static("frontend"));

app.listen(PORT, () => {
    signale.info("Listening on port", PORT);
});