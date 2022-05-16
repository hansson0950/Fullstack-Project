const Order = require("../models/order");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const order = new Order({
        user: req.body.user,
        products: req.body.products,
        price: req.body.price
    });
    try {
        const newOrder = await order.save()
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/:id", getOrder, (req, res) => {
    res.json(res.order);
});

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: "Order does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.order = order;
    next();
}

module.exports = router;