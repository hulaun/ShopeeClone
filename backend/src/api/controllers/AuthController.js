const sql = require("mssql");
const db = require("../../config/db");
const crypto = require("crypto");
const AuthService = require("../services/AuthService");
const { createSalt, hashPassword } = require("../utils/AuthUtils");

class AuthController {
  async signup(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;
      const appStatus = await AuthService.signup(loginKey, password);
      console.log("appStatus:", appStatus);
      res
        .status(appStatus.status)
        .json({ message: appStatus.message, data: appStatus.data });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async signin(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      var user = await validatePassword(loginKey, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
}

module.exports = new AuthController();
