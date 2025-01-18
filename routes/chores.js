const express = require("express");

const choresController = require("../controllers/chores");

const router = express.Router();

router.get("/:userId", choresController.getUserChores);

router.get("/", choresController.getChores);

router.post("/", choresController.postChore);

module.exports = router;
