import { db } from "../../config/db";
import { Cart } from "../../../db/schema";
import { CartModel } from "../models/model";
import { eq } from "drizzle-orm";

class CartRepo {
  private static instance: CartRepo;

  constructor() {
    if (CartRepo.instance) {
      return CartRepo.instance;
    }
    CartRepo.instance = this;
  }

  async findAll() {
    try {
      const carts = await db.select().from(Cart);
      return carts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(cartId: string) {
    try {
      const cart = await db.select().from(Cart).where(eq(Cart.id, cartId));
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(newCart: CartModel) {
    try {
      const cart = await db
        .insert(Cart)
        .values({
          ...newCart
        })
        .returning({ insertedId: Cart.id, userId: Cart.userId });
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(cartId: string) {
    try {
      const cart = await db
        .delete(Cart)
        .where(eq(Cart.id, cartId))
        .returning({ id: Cart.id, userId: Cart.userId });
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(cartId: string, updatedColumns: CartModel) {
    try {
      const cart = await db
        .update(Cart)
        .set({ ...updatedColumns })
        .where(eq(Cart.id, cartId))
        .returning();
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new CartRepo();
Object.freeze(instance);

export default instance;