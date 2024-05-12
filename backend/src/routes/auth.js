const express = require("express");
const router = express.Router();

const authenticationController = require("../api/controllers/AuthenticationController");

router.post("/signup", authenticationController.signup);
router.post("/signin", authenticationController.signin);

module.exports = router;
