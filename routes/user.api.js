const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

//Register in
router.post("/", userController.createUser);

module.exports = router;