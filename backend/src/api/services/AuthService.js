const AuthRepo = require("../repos/AuthRepo");
const { hashPassword, createSalt } = require("../utils/AuthUtils");
class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  async signup(loginKey, password) {
    if (await AuthRepo.hasAccount(loginKey)) {
      return {
        status: 400,
        message: "Account already exists.",
        data: { user: null },
      };
    }
    const salt = createSalt();
    const passwordHash = hashPassword(password, salt);
    const user = await AuthRepo.addUser(loginKey, passwordHash, salt);

    const token = jwt.sign(
      { id: user.id, loginKey: user.loginKey, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return { status: 200, message: "Success", data: { user: user } };
  }

  async signin(loginKey, password) {
    if (!loginKey || typeof loginKey !== "string") {
      return {
        status: 400,
        message: "Please fill in your username or email.",
        data: { user: null },
      };
    }
    const userData = await AuthRepo.getUserAccount(loginKey, password);
    if (!userData.user) {
      return {
        status: 400,
        message: userData.message,
        data: { user: userData.user },
      };
    }
    return {
      status: 200,
      message: userData.message,
      data: userData.user,
    };
  }
}
const instance = new AuthService();
Object.freeze(instance);

module.exports = instance;
