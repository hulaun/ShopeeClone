import { db } from "../../config/db";
import { Shop } from "../../../db/schema";
import { ShopModel } from "../models/model";
import { eq } from "drizzle-orm";

class ShopRepo {
  private static instance: ShopRepo;

  constructor() {
    if (ShopRepo.instance) {
      return ShopRepo.instance;
    }
    ShopRepo.instance = this;
  }

  async findAll() {
    try {
      const shops = await db.select().from(Shop);
      return shops;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(shopId: string) {
    try {
      const shop = await db.select().from(Shop).where(eq(Shop.id, shopId));
      return shop;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(newShop: ShopModel) {
    try {
      const shop = await db
        .insert(Shop)
        .values({
          ...newShop
        })
        .returning({ insertedId: Shop.id, name: Shop.name });
      return shop;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(shopId: string) {
    try {
      const shop = await db
        .delete(Shop)
        .where(eq(Shop.id, shopId))
        .returning({ id: Shop.id, name: Shop.name });
      return shop;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(shopId: string, updatedColumns: ShopModel) {
    try {
      const shop = await db
        .update(Shop)
        .set({ ...updatedColumns })
        .where(eq(Shop.id, shopId))
        .returning();
      return shop;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new ShopRepo();
Object.freeze(instance);

export default instance;