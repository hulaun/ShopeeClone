import { NextFunction, Request, Response } from "express";
import { signAccessToken, verifyAccessToken, verifyRefreshToken } from "../utils/AuthUtils";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  let decoded;
  let accessToken =
    (authHeader && authHeader?.split(" ")[1]) || req.cookies?.accessToken;
  if (accessToken) {
    accessToken = verifyAccessToken(accessToken);
    if (accessToken) {
      res.locals.user = accessToken;
      return next();
    }
  }
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return next();
  }
  decoded = verifyRefreshToken(refreshToken);
  accessToken = signAccessToken(decoded);
  res.locals.token = accessToken;
  if (decoded) {
    res.locals.user = decoded;
  }
  next();
};

