const express = require("express");

const achievementController = require("../controllers/achievement");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, achievementController.getAchievements);

router.get("/reward", isAuth, achievementController.getReward);

module.exports = router;
