const Product = require("../models/product");
const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})