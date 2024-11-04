import { NextFunction, Request, Response } from "express";

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  if(!res.locals.user){
    return res.status(401).json({
      message:"User is unauthorized"
    })
  }
  next();
}

