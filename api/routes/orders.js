const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /orders"
    })
})

router.post("/", (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Handling POST request to /orders",
        order: order

    })
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