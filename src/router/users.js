const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const auth = require("../middleware/auth");

router.get("/", auth, userController.getUser);

router.post("/", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

module.exports = router;
