const { omit } = require("lodash");
const AuthService = require("../services/AuthService");

class AuthController {
  constructor() {
    if (AuthController.instance) {
      return AuthController.instance;
    }
    AuthController.instance = this;
  }

  async signup(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;
      const appStatus = await AuthService.signup(loginKey, password);
      res.cookie("refreshToken", appStatus.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(appStatus.status).json({
        message: appStatus.message,
        data: omit(appStatus.data, ["refreshToken"]),
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async signin(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      const appStatus = await AuthService.signin(loginKey, password);
      res.cookie("refreshToken", appStatus.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(appStatus.status).json({
        message: appStatus.message,
        data: omit(appStatus.data, ["refreshToken"]),
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new AuthController();
Object.freeze(instance);

module.exports = instance;
