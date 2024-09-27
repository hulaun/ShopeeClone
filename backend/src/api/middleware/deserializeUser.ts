import { NextFunction, Request, Response } from "express";

const { verifyToken } = require("../utils/AuthUtils");

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken =
    req.cookies.accessToken || (authHeader && authHeader.split(" ")[1]);

  if (!accessToken) {
    next();
  }

  const decoded = verifyToken(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }
  next();
};

module.exports = deserializeUser;
