const express = require("express");
const router = express.Router();
const { Sequelize, Model, DataTypes } = require('sequelize');
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
})

router.post('/', async (req, res, next) => {
    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
    })
    res.status(201).json({
        message: "Handling POST request to /products",
        product: product.toJSON(),
    })
})

router.get('/:productID', (req, res, next) => {
        const id = req.params.productID;
        res.status(200).json({
            message: "Handling GET request to /products:productID",
            id: id
        })
    }
)

router.patch('/:productID', (req, res, next) => {
        const id = req.params.productID;
        res.status(200).json({
            message: "Handling PATCH request to /products:productID",
            id: id
        })
    }
)

router.delete('/:productID', (req, res, next) => {
        const id = req.params.productID;
        res.status(200).json({
            message: "Handling DELETE request to /products:productID",
            id: id
        })
    }
)

module.exports = router;

