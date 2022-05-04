const Product = require("../models/product");
const express = require("express");
const router = express.Router();
module.exports = router;

// Creating a new product
router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imgLink: req.body.imgLink
    });
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Getting all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting one product
router.get("/:id", getProducts, (req, res) => {
    res.json(res.product);
});

// Middleware
async function getProducts(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Product does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.product = product;
    next();
}