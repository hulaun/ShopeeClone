import { UserModel } from "../models/model";
import UserRepo from "../repos/UserRepo";
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  private static instance: CloudinaryService;

  constructor() {
    if (CloudinaryService.instance) {
      return CloudinaryService.instance;
    }
    CloudinaryService.instance = this;
  }

  
  async test(){
    // const uploadResult = await cloudinary.uploader
    //   .upload(
    //       'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //           public_id: 'shoes',
    //       }
    //   )
    //   .catch((error) => {
    //       console.log(error);
    //   });
    
    // console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const someUrl = cloudinary.url("samples/landscapes/landscape-panorama");
    
    console.log(someUrl);
    const optimizeUrl = await cloudinary.api.resource("shoes");
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.image('shoes');
    
    console.log(autoCropUrl);
};

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

  async update(userId: string, updateData: UserModel) {
    try {
      const user = await UserRepo.update(userId, updateData);
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
}

const instance = new CloudinaryService();
Object.freeze(instance);

export default instance;