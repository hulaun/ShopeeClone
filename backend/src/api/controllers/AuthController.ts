import { NextFunction, Request, Response } from "express";
import { setRefreshTokenCookie } from "../utils/AuthUtils";
import AuthService from "../services/AuthService";
const { omit } = require("lodash");

class AuthController {

  private static instance: AuthController;

  constructor() {
    if (AuthController.instance) {
      return AuthController.instance;
    }
    AuthController.instance = this;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;
      const appStatus = await AuthService.signup(loginKey, password);

      setRefreshTokenCookie(res, appStatus.data.refreshToken);

      res.status(appStatus.status).json({
        message: appStatus.message,
        data: omit(appStatus.data, ["refreshToken"]),
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      const appStatus = await AuthService.signin(loginKey, password);
      setRefreshTokenCookie(res, appStatus.data.refreshToken);

      return res.status(appStatus.status).json({
        message: appStatus.message,
        data: omit(appStatus.data, ["refreshToken"]),
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signinWithGoogleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationUri = await AuthService.signinWithGoogleLogin();
      res.redirect(authorizationUri);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signinWithGoogleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const code:string = req.query.code as string;
      const appStatus = await AuthService.signinWithGoogleCallback(code);
      res.cookie("refreshToken", appStatus.data.refreshToken, {
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      const responseData = omit(appStatus.data, ["refreshToken"]);
      Object.keys(responseData).forEach((key) => {
        res.cookie(key, responseData[key], {
          sameSite: "lax",
          maxAge: 30 * 1000,
        });
      });

      // Redirect to the client URL without response data in the URL
      const clientUrl = `${process.env.CLIENT_URL}`;
      res.redirect(clientUrl);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Sign out successful" });
    } catch (error) {
      console.error("Error signing out:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new AuthController();
Object.freeze(instance);

export default instance;
