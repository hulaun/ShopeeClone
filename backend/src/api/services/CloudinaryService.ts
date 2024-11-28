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
  
  async uploadImage(image: any, userId: string){
    try{
      const base64Image = `data:${image.mimetype};base64,${image.data.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      public_id: 'profileImage',
      folder: `users/${userId}`,
    });
      return uploadResult.public_id;
    }catch(error){
      console.log(error)
      return error
    }
  }
}

const instance = new CloudinaryService();
Object.freeze(instance);

export default instance;