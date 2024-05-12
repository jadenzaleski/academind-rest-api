const express = require("express");
const router = express.Router();
const {Sequelize, Model, DataTypes} = require('sequelize');
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(r => {
            res.status(200).json(r)
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

router.post('/', async (req, res, next) => {
    const product = await Product.create({
        name: req.body.name, price: req.body.price,
    }).then(r => {
        res.status(201).json({
            message: "Product added to database.", product: product.toJSON(),
        })
    }).catch(err => {
        res.status(500).json(err)
    })

})

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findAll({
        where: {
            _id: id
        }
    }).then(r => {
        if (r.length > 0) {
            res.status(200).json(r)
        } else {
            res.status(404).json({message: "Product not found."})
        }
    }).catch(err => {
        res.status(500).json(err)
    });
})

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update(
        updateOps,
        {
            where: {
                _id: id
            }
        })
        .then(r => {
            res.status(200).json(r)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.destroy({
        where: {
            _id: id
        }
    }).then(r => {
        res.status(200).json({
            message: "Products deleted from database with matching id.", _id: id, response: r
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;
