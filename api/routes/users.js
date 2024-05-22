const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Product = require("../models/product"); // Adjust the path to your User model if necessary

router.post('/signup', (req, res, next) => {
    User.findAll({
        where: {
            email: req.body.email
        }
    }).then(r => {
        if (r.length > 0) {
            return res.status(409).json({
                message: "The email " + req.body.email + " already exists.",
            });
        }
    })
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: "An error occurred while hashing the password.",
                error: err.message
            });
        } else {
            try {
                const user = await User.create({
                    email: req.body.email,
                    password: hash
                });

                res.status(201).json({
                    message: "User created successfully.",
                    user: {
                        _id: user._id,
                        email: user.email
                    }
                });
            } catch (err) {
                res.status(500).json({
                    message: "An error occurred while creating the user.",
                    error: err.message,
                });
            }
        }
    });
});

router.post("/login", (req, res, next) => {
    User.findAll( {
        where: {
            email: req.body.email
        }
    })
})

router.delete("/:userID", async (req, res, next) => {
    const id = req.params.userID;
    User.destroy({
        where: {
            _id: id
        }
    }).then(r => {
        res.status(200).json({
            message: "User(s) deleted from database with matching id.",
            _id: id,
            response: r
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;
