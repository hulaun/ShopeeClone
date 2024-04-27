const express = require("express");
const router = express.Router();

const customerController = require("../api/controllers/CustomerController");

router.get("/show", customerController.show);
router.post("/store", customerController.store);
router.post("/login", customerController.login);

module.exports = router;
