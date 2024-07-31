const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signin/oauth/google", AuthController.signin);
router.post("/signin/oauth/facebook", AuthController.signin);

module.exports = router;
