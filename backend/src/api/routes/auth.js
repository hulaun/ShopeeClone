const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/AuthenticationController");

router.post("/signup", authenticationController.signup);
router.post("/signin", authenticationController.signin);
router.post("/signin/oauth/google", authenticationController.signin);
router.post("/signin/oauth/facebook", authenticationController.signin);

module.exports = router;
