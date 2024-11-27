import {db} from "../../config/db";
import { User } from "../../../db/schema";
import { UserModel } from "../models/model"
import { asc, desc, eq, not, sql } from "drizzle-orm";
import { add } from "lodash";

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

  async findSome(page: number, limit: number, sortOption: string, sortOrder: string) {
    try{
      let query;
      if(sortOption === 'role'){
        query = db.select({
          id: User.id,
          username: User.username,
          email: User.email,
          fullName: User.fullName,
          createdAt: User.createdAt,
          role: User.role,
        }).from(User)
        .where(eq(User.role, sortOrder as 'Consumer' | 'Vendor'))
        .limit(limit)
        .offset((page-1)*limit)
      }else{
        query = db.select({
          id: User.id,
          username: User.username,
          email: User.email,
          fullName: User.fullName,
          createdAt: User.createdAt,
          role: User.role,
        }).from(User)
        .where(not(eq(User.role, 'Admin')))
        .limit(limit)
        .offset((page-1)*limit)
        .orderBy(sortOrder==='asc'?
          asc(User[sortOption as keyof UserModel]):
          desc(User[sortOption as keyof UserModel]))
      }
      return await query;
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

  async countPages(limit: number) {
    try{
      const num = await db.select({
        count: sql<number>`cast(count(${User.id}) as int)`}).from(User)
        return Math.ceil(num[0].count/limit)
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

  async profile(userId: string) {
    try{
      const user = await db
        .select({
          username: User.username,
          email: User.email,
          fullName: User.fullName,
          gender: User.gender,
          dob: User.dob,
          address: User.address,
          phoneNumber: User.phoneNumber,
        })
        .from(User)
        .where(eq(User.id, userId))
      return user[0]
    }catch(error){
      console.log(error)
      return error
    }
  }
}

const instance = new UserRepo();
Object.freeze(instance);

export default instance;
