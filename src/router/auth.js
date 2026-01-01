const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

router.post("/register", userController.registerUser);

router.get("/login", userController.userLogin);

module.exports = router;
