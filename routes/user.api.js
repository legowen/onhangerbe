const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

//Register in
router.post("/", userController.createUser);
router.get("/me", authController.authenticate, userController.getUser); // Check token is valid, Return After Find User with token

module.exports = router;
