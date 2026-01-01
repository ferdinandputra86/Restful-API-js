const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

router.get("/", userController.getUser);

router.post("/", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

router.post("/register", userController.registerUser);

module.exports = router;
