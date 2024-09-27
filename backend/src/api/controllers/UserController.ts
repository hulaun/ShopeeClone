import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { User } from "../../../db/schema";
import UserService from "../services/UserService";

class UserController {
  private static instance: UserController;

  constructor() {
    if (UserController.instance) {
      return UserController.instance;
    }
    UserController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.viewAll();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const user = await UserService.view(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = req.body;
      const user = await UserService.create(newUser);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const updateData = req.body;
      const user = await UserService.update(userId, updateData);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      await UserService.delete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new UserController();
Object.freeze(instance);

export default instance;