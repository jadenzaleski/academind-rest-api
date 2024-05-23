const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require("../middleware/check-auth");

router.post('/signup', UserController.users_signup);

router.post("/login", UserController.users_login);

router.delete("/:userID", checkAuth, UserController.users_delete);

module.exports = router;
