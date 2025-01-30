const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/login", authController.postUser);

router.put("/signup", authController.putUser);

router.post("/forgot-password", authController.postForgotPassword);

router.post("/update-password", authController.postUpdatePassword);

router.post("/signout", authController.postSignoutUser);

module.exports = router;
