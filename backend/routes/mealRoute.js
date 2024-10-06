const express = require("express");

const {
  getmeals,
  getmeal,
  createmeal,
  updatemeal,
  deletemeal,
} = require("../services/mealService");

const authService = require('../services/authService');

const router = express.Router();

router.route("/").get(getmeals).post(createmeal);
router.route("/:id").get(getmeal).put(updatemeal).delete(deletemeal);

module.exports = router;
