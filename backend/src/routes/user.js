const express = require("express");
const router = express.Router();

const userController = require("../api/controllers/UserController");

router.get("/show", userController.show);

module.exports = router;
