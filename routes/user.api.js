const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

//Register in
router.post("/", userController.createUser);
router.get("/me", authController.authenticate, userController.getUser); // Check token is valid, Return After Find User with token

module.exports = router;
