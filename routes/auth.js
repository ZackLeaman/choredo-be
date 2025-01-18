const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/login", authController.postUser);

router.post("/signup", authController.putUser);

module.exports = router;
