const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", checkAuth,async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: {
                model: Product,
                attributes: ['_id', 'name', 'price']
            }
        });

        const response = {
            count: orders.length,
            docs: orders.map(order => {
                return {
                    _id: order._id,
                    quantity: order.quantity,
                    product: {
                        _id: order.Product._id,
                        name: order.Product.name,
                        price: order.Product.price
                    },
                    request: {
                        type: "GET",
                        url: `http://${process.env.SERVER_NAME}:${process.env.PORT}/orders/${order._id}`
                    }
                };
            })
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching the orders.",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

router.post("/", checkAuth, async (req, res, next) => {
    try {
        // Check if the product exists
        const product = await Product.findByPk(req.body.product);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Create the order
        const order = await Order.create({
            product: req.body.product,
            quantity: req.body.quantity
        });

        // Respond with the created order
        res.status(201).json({
            message: "Order created successfully.",
            order: order.toJSON()
        });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({
            message: "An error occurred while creating the order.",
            error: err.message
        });
    }
});


router.get("/:orderID", checkAuth, async (req, res, next) => {
    const id = req.params.orderID;

    try {
        // Find the order by ID and include the associated Product
        const order = await Order.findByPk(id, {
            include: {
                model: Product,
                attributes: ['_id', 'name', 'price']
            }
        });

        // Check if the order exists
        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
                details: `No order found with ID: ${id}`
            });
        }

        // Respond with the order details, including product information
        res.status(200).json({
            message: "Order retrieved successfully.",
            order: {
                _id: order._id,
                quantity: order.quantity,
                product: {
                    _id: order.Product._id,
                    name: order.Product.name,
                    price: order.Product.price
                },
                request: {
                    type: "GET",
                    url: `http://${process.env.SERVER_NAME}:${process.env.PORT}/orders/${order._id}`
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while retrieving the order.",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});


router.delete("/:orderID", checkAuth, (req, res, next) => {
    const id = req.params.orderID;
    Order.destroy({
        where: {
            _id: id
        }
    }).then(r => {
        res.status(200).json({
            message: "Order deleted from database with matching id.", _id: id,
            response: r
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;