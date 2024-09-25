import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/UserModel";
import UserRepo from "../repos/UserRepo";

class UserService {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser: UserModel = req.body as UserModel;
      const user = await UserRepo.create(newUser);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepo.findAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;
    const updateData: UserModel = req.body as UserModel;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        message: "Please provide a valid user id",
      });
    }

    try {
      const user = await UserRepo.update(userId, updateData);
      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        message: "Please provide a valid user id",
      });
    }

    try {
      await UserRepo.delete(userId);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new UserService();
export default instance;