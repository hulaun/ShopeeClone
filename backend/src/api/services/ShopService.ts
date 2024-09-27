import { ShopModel } from "../models/model";
import ShopRepo from "../repos/ShopRepo";

class ShopService {
  private static instance: ShopService;

  constructor() {
    if (ShopService.instance) {
      return ShopService.instance;
    }
    ShopService.instance = this;
  }

  async create(newShop: ShopModel) {
    try {
      const shop = await ShopRepo.create(newShop);
      return shop;
    } catch (error) {
      console.error("Error creating shop:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const shops = await ShopRepo.findAll();
      return shops;
    } catch (error) {
      console.error("Error fetching shops:", error);
      throw new Error("Internal server error");
    }
  }

  async view(shopId: string) {
    try {
      const shop = await ShopRepo.findById(shopId);
      return shop;
    } catch (error) {
      console.error("Error fetching shop:", error);
      throw new Error("Internal server error");
    }
  }

  async update(shopId: string, updateData: ShopModel) {
    try {
      const shop = await ShopRepo.update(shopId, updateData);
      return shop;
    } catch (error) {
      console.error("Error updating shop:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(shopId: string) {
    try {
      await ShopRepo.delete(shopId);
    } catch (error) {
      console.error("Error deleting shop:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new ShopService();
Object.freeze(instance);

export default instance;