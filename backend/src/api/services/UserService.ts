import { UserModel } from "../models/model";
import UserRepo from "../repos/UserRepo";
import CloudinaryService from "./CloudinaryService";
class UserService {
  private static instance: UserService;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }
    UserService.instance = this;
  }

  async create(newUser: UserModel) {
    try {
      const user = await UserRepo.create(newUser);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const users = await UserRepo.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Internal server error");
    }
  }

  async viewPage(page: number, limit: number, sortOption: string, sortOrder: string) {
    try {
      const numberOfPages = await UserRepo.countPages(limit);
      const users = await UserRepo.findSome(page, limit, sortOption, sortOrder);
      return {
        users: users,
        numberOfPages: numberOfPages,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Internal server error");
    }
  }

  async view(userId: string) {
    try {
      const user = await UserRepo.findById(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Internal server error");
    }
  }

  async update(userId: string, updateData: any, newImage: any) {
    try {
      console.log("updateData", updateData);
      console.log("image", newImage);
      let profilePicture:string="";
      if(newImage){
        profilePicture = await CloudinaryService.uploadImage(newImage, userId) as string;
      }
      const user = await UserRepo.update(userId, profilePicture?{
        ...updateData,
        profilePicture,
      }:updateData);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(userId: string) {
    try {
      await UserRepo.delete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Internal server error");
    }
  }

  async profile(userId: string) {
    try {
      const user = await UserRepo.profile(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new UserService();
Object.freeze(instance);

export default instance;