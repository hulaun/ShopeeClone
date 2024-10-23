import { Request, Response, NextFunction } from "express";
import {db} from "../../config/db";
import { User } from "../../../db/schema";
import { UserModel } from "../models/model"
import { eq } from "drizzle-orm";
import { omit } from "lodash";

class UserRepo {

  private static instance: UserRepo;
  
  public constructor() {
    if (UserRepo.instance) {
      return UserRepo.instance;
    }
    UserRepo.instance = this;
  }

  async findAll() {
    try{
      const users = await db.select({
        id: User.id,
        username: User.username,
        email: User.email,
        fullName: User.fullName,
        createdAt: User.createdAt,
        role: User.role,
      }).from(User)
      return users
    }catch(error){
      console.log(error)
      return error
    }
  }

  async findSome(page: number, limit: number) {
    try{
      const users = await db.select({
        id: User.id,
        username: User.username,
        email: User.email,
        fullName: User.fullName,
        createdAt: User.createdAt,
        role: User.role,
      }).from(User)
      .limit(limit)
      .offset((page-1)*limit)
      return users
    }catch(error){
      console.log(error)
      return error
    }
  }
  
  async findById(userId: string) {
    try{
      const user = await db.select().from(User).where(eq(User.id, userId))
      return user
    }catch(error){
      console.log(error)
      return error
    }
  }

  async create(newUser: UserModel) {
    try{
      const user = await db
        .insert(User)
        .values({
          ...newUser,
          status: "Inactive",
        })
        .returning({insertedId: User.id, username: User.username})
      return user
    }catch(error){
      console.log(error)
      return error
    }
  }

  async delete(userId: string) {
    try{
      const user = await db
        .delete(User)
        .where(eq(User.id,userId))
        .returning({id:User.id, username:User.username})
      return user
    }catch(error){
      console.log(error)
      return error
    }
  }

  async update(userId: string, updatedColumns: UserModel) {
      try{
        const user = await db
          .update(User)
          .set({...updatedColumns})
          .where(eq(User.id,userId))
          .returning()
        return user
      }catch(error){
        console.log(error)
        return error
      }
  }
}

const instance = new UserRepo();
Object.freeze(instance);

export default instance;
