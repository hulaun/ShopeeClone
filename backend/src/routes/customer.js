const express = require("express");
const router = express.Router();

const customerController = require("../api/controllers/CustomerController");

router.get("/view", customerController.show);

module.exports = router;
