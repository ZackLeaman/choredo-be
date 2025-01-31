const express = require("express");

const userProfileController = require("../controllers/user-profile");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, userProfileController.getUserProfile);

router.post("/", isAuth, userProfileController.postUserProfile);

module.exports = router;
