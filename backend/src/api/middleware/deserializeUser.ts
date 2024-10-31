import { NextFunction, Request, Response } from "express";
import { signAccessToken, verifyAccessToken, verifyRefreshToken } from "../utils/AuthUtils";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  let decoded;
  let accessToken =
    (authHeader && authHeader?.split(" ")[1]) || req.cookies?.accessToken;
  if (!accessToken) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return next();
    }
    decoded = verifyRefreshToken(refreshToken);
    accessToken = signAccessToken(decoded);
    res.locals.token = accessToken;
  }
  else{
    decoded = verifyAccessToken(accessToken);
  }

  if (decoded) {
    res.locals.user = decoded;
  }
  next();
};

