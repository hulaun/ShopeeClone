const jwt = require("jsonwebtoken");
import crypto from "crypto";
import { UserModel } from "../models/model";
import { Response } from "express";

export const createSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const hashPassword = (password: string, salt: any) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

export const signAccessToken = (user: UserModel) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

export const signRefreshToken = (user: UserModel) => {
  return jwt.sign(
    { id: user.id, username: user.username,email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  return res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

