const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const OrderController = require("../controllers/orders");

router.get("/", checkAuth, OrderController.orders_get_all);

router.post("/", checkAuth, OrderController.orders_create);

router.get("/:orderID", checkAuth, OrderController.orders_get_one);

router.delete("/:orderID", checkAuth, OrderController.orders_delete);

module.exports = router;