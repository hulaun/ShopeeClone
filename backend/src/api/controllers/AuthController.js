// const { omit } = require("lodash");
// const AuthService = require("../services/AuthService");

// class AuthController {
//   constructor() {
//     if (AuthController.instance) {
//       return AuthController.instance;
//     }
//     AuthController.instance = this;
//   }

//   async signup(req, res, next) {
//     try {
//       const loginKey = req.body.loginKey;
//       const password = req.body.password;
//       const appStatus = await AuthService.signup(loginKey, password);
//       res.cookie("refreshToken", appStatus.data.refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "Strict",
//         maxAge: 3 * 24 * 60 * 60 * 1000,
//       });
//       res.status(appStatus.status).json({
//         message: appStatus.message,
//         data: omit(appStatus.data, ["refreshToken"]),
//       });
//     } catch (error) {
//       console.error("Error signing up:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
//   async signin(req, res, next) {
//     try {
//       const loginKey = req.body.loginKey;
//       const password = req.body.password;

//       const appStatus = await AuthService.signin(loginKey, password);
//       res.cookie("refreshToken", appStatus.data.refreshToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax",
//         maxAge: 3 * 24 * 60 * 60 * 1000,
//       });
//       return res.status(appStatus.status).json({
//         message: appStatus.message,
//         data: omit(appStatus.data, ["refreshToken"]),
//       });
//     } catch (error) {
//       console.error("Error logging in:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }

//   async signinWithGoogleLogin(req, res, next) {
//     try {
//       const authorizationUri = await AuthService.signinWithGoogleLogin();
//       res.redirect(authorizationUri);
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }

//   async signinWithGoogleCallback(req, res, next) {
//     try {
//       const code = req.query.code;
//       const appStatus = await AuthService.signinWithGoogleCallback(code);
//       res.cookie("refreshToken", appStatus.data.refreshToken, {
//         sameSite: "Lax",
//         maxAge: 3 * 24 * 60 * 60 * 1000,
//       });

//       const responseData = omit(appStatus.data, ["refreshToken"]);
//       Object.keys(responseData).forEach((key) => {
//         res.cookie(key, responseData[key], {
//           sameSite: "Lax",
//           maxAge: 30 * 1000,
//         });
//       });

//       // Redirect to the client URL without response data in the URL
//       const clientUrl = `${process.env.CLIENT_URL}`;
//       res.redirect(clientUrl);
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// }

// const instance = new AuthController();
// Object.freeze(instance);

// module.exports = instance;
