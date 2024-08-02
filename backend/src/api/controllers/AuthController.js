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

const instance = new AuthController();
Object.freeze(instance);

module.exports = instance;
