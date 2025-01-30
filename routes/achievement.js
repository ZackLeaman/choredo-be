const express = require("express");

const achievementController = require("../controllers/achievement");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/reward", isAuth, achievementController.getReward);

module.exports = router;
