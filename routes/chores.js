const express = require("express");

const choresController = require("../controllers/chores");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/public", isAuth, choresController.getPublicChores);

router.get("/", isAuth, choresController.getUserChores);

router.post("/", isAuth, choresController.postChore);

router.put("/:choreId", isAuth, choresController.putChore);

router.post("/complete/:choreId", isAuth, choresController.postCompleteChore);

router.delete("/:choreId", isAuth, choresController.deleteChore);

module.exports = router;
