const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
})

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    }
    res.status(201).json({
        message: "Handling POST request to /products",
        createdProduct: product
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

