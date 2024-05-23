const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
    Product.findAll()
        .then(r => {
            const response = {
                count: r.length,
                docs: r.map(d => {
                    return {
                        name: d.name,
                        price: d.price,
                        _id: d._id,
                        productImage: d.productImage,
                        request: {
                            type: "GET",
                            url: "http://" + process.env.SERVER_NAME + ":" + process.env.PORT +"/products/" + d._id
                        }
                    }

                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        });
}

exports.products_create = async (req, res, next) => {
    console.log(req.file);
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
        res.status(201).json({
            message: "Product added to database.",
            product: product.toJSON(),
            request: {
                type: "POST",
                url: "http://" + process.env.SERVER_NAME + ":" + process.env.PORT + "/products/" + product._id,
            }
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

exports.products_get_one = (req, res, next) => {
    const id = req.params.productID;
    Product.findAll({
        where: {
            _id: id
        }
    }).then(r => {
        if (r.length > 0) {
            res.status(200).json( {
                response: r,
                request: {
                    type: "GET",
                    url: "http://" + process.env.SERVER_NAME + ":" + process.env.PORT + "/products",
                }
            })
        } else {
            res.status(404).json({message: "Product not found."})
        }
    }).catch(err => {
        res.status(500).json(err)
    });
}

exports.products_update = (req, res, next) => {
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
            res.status(200).json( {
                response: r,
                request: {
                    type: "PATCH",
                    url: "http://" + process.env.SERVER_NAME + ":" + process.env.PORT + "/products/" + id,
                }
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.products_delete = (req, res, next) => {
    const id = req.params.productID;
    Product.destroy({
        where: {
            _id: id
        }
    }).then(r => {
        res.status(200).json({
            message: "Products deleted from database with matching id.", _id: id,
            response: r
        })
    }).catch(err => {
        res.status(500).json(err)
    })
}