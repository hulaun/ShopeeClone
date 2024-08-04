const AuthRepo = require("../repos/AuthRepo");
const {
  hashPassword,
  createSalt,
  signAccessToken,
  signRefreshToken,
} = require("../utils/AuthUtils");
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

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    return {
      status: 200,
      message: "Success",
      data: {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
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

    const accessToken = signAccessToken(userData.user);
    const refreshToken = signRefreshToken(userData.user);

    return {
      status: 200,
      message: userData.message,
      data: {
        user: userData.user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
}
const instance = new AuthService();
Object.freeze(instance);

module.exports = instance;
