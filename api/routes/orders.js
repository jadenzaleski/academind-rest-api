const express = require("express");
const router = express.Router();
const {Sequelize, Model, DataTypes} = require('sequelize');
const Order = require("../models/order");

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /orders"
    })
})

router.post("/", async (req, res, next) => {
    try {
        const order = await Order.create({
            product: req.body.product,
            quantity: req.body.quantity
        })

        res.status(201).json({
            message: "Order created successfully.",
            order: order.toJSON() // Convert to JSON for consistency
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get("/:orderID", (req, res, next) => {
    const id = req.params.orderID;
    res.status(201).json({
        message: "Handling GET request to /orders:orderID",
        id: id
    })
})

router.delete("/:orderID", (req, res, next) => {
    const id = req.params.orderID;
    res.status(201).json({
        message: "Handling DELETE request to /orders:orderID",
        id: id
    })
})

module.exports = router;