// require("dotenv").config();

// const AuthRepo = require("../repos/AuthRepo");
// const {
//   hashPassword,
//   createSalt,
//   signAccessToken,
//   signRefreshToken,
// } = require("../utils/AuthUtils");
// class AuthService {
//   constructor() {
//     if (AuthService.instance) {
//       return AuthService.instance;
//     }
//     AuthService.instance = this;
//   }

//   async signup(loginKey, password) {
//     if (await AuthRepo.hasAccount(loginKey)) {
//       return {
//         status: 400,
//         message: "Account already exists.",
//         data: { user: null },
//       };
//     }
//     const salt = createSalt();
//     const passwordHash = hashPassword(password, salt);
//     const user = await AuthRepo.addUser(loginKey, passwordHash, salt);

//     const accessToken = signAccessToken(user);
//     const refreshToken = signRefreshToken(user);

//     return {
//       status: 200,
//       message: "Success",
//       data: {
//         user: user,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       },
//     };
//   }

//   async signin(loginKey, password) {
//     if (!loginKey || typeof loginKey !== "string") {
//       return {
//         status: 400,
//         message: "Please fill in your username or email.",
//         data: { user: null },
//       };
//     }
//     const userData = await AuthRepo.getUserAccount(loginKey, password);
//     if (!userData.user) {
//       return {
//         status: 400,
//         message: userData.message,
//         data: { user: userData.user },
//       };
//     }

//     const accessToken = signAccessToken(userData.user);
//     const refreshToken = signRefreshToken(userData.user);

//     return {
//       status: 200,
//       message: userData.message,
//       data: {
//         user: userData.user,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       },
//     };
//   }

//   async signinWithGoogleLogin() {
//     return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}&response_type=code&scope=email%20profile`;
//   }

//   async signinWithGoogleCallback(code) {
//     const response = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
//         code: code,
//         grant_type: "authorization_code",
//       }),
//     });
//     const data = await response.json();

//     if (data.error) {
//       return {
//         status: 400,
//         message: data.error_description,
//         data: { user: null },
//       };
//     }

//     const gglAccessToken = data.access_token;

//     const userData = await fetch(
//       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${gglAccessToken}`
//     );

//     const user = await userData.json();
//     const userExists = await AuthRepo.hasAccount(user.email);
//     if (!userExists) {
//       await AuthRepo.addUser(user.email, null, null, user.name, user.picture);
//     }

//     const accessToken = signAccessToken(user);
//     const refreshToken = signRefreshToken(user);

//     return {
//       status: 200,
//       message: "Success",
//       data: {
//         user: user,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       },
//     };
//   }
// }
// const instance = new AuthService();
// Object.freeze(instance);

// module.exports = instance;
