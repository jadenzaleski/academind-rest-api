const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.users_signup = (req, res, next) => {
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
}

exports.users_login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed.",
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed.",
                })
            }
            if (isMatch) {
                const token = jwt.sign({
                        email: user.email,
                        userID: user._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES
                    })
                return res.status(200).json({
                    message: "Auth Successful.",
                    token: token
                })
            }
            return res.status(401).json({
                message: "Auth failed.",
            })
        })
    }).catch(err => {
        res.status(500).json(err)
    })
}

exports.users_delete = async (req, res, next) => {
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
}