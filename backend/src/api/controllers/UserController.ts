import { Request, Response, NextFunction } from "express";
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
      const accessToken = res.locals.token;
      const users = await UserService.viewAll();
      res.json({
        data:users,
        message:"Users fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewPage(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const page = parseInt(req.params.page as string) ||1;
      const limit = parseInt(req.query.limit as string)||10;
      const sortOption = req.query.sort as string || "name";
      const sortOrder = req.query.order as string || "asc";
      const data = await UserService.viewPage(page, limit, sortOption, sortOrder);
      res.json({
        data:data,
        message:"Users fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const userId: string = req.params.id;
      const user = await UserService.view(userId);
      res.json({
        data:user,
        message:"Users fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const newUser = req.body;
      const user = await UserService.create(newUser);
      res.status(201).json({
        data:user,
        message:"Users created successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const userId: string = req.params.id;
      const updateData = req;
      console.log("updateData",updateData.body);
      // const user = await UserService.update(userId, updateData);
      res.status(200).json({
        data:undefined,
        message:"Users updates successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const userId: string = req.params.id;
      await UserService.delete(userId);
      res.status(200).json({
        message: "User deleted successfully",
        accessToken });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const userId = req.params.id;
      const data = await UserService.profile(userId);
      res.status(200).json({
        data:data,
        message:"User profile fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new UserController();
Object.freeze(instance);

export default instance;