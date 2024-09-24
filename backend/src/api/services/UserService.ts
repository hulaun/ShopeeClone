import { Request, Response, NextFunction } from "express";
import {db} from "../../config/db";
import { User } from "../../../db/schema";
import { UserModel } from "../models/UserModel"
import { eq } from "drizzle-orm";
class UserService {

  private static instance: UserService;
  
  public constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }
    UserService.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await db.select().from(User)
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.id)
      const response = await db.select().from(User).where(eq(User.id, userId))
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if(typeof req.body !== 'object'  || req.body ===null){
        res.status(400).json({
          message : "request is invalid"
        })
      }
      const newUser: UserModel= req.body as UserModel
      const user = await db
        .insert(User)
        .values({
          ...newUser
        })
        .returning({insertedId: User.id, username: User.username})
      res.json(user)

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction){
    try {
      const userId: number=parseInt(req.params.id)
      const user = await db
        .delete(User)
        .where(eq(User.id,userId))
        .returning({id:User.id, username:User.username})
      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction){
    try {
      const userId: number=parseInt(req.params.id)
      const updateData: UserModel = req.body
      const user = await db
        .update(User)
        .set({...updateData})
        .where(eq(User.id,userId))
        .returning()
      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new UserService();
Object.freeze(instance);

export default instance;
