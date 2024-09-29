import { CartModel } from "../models/model";
import CartRepo from "../repos/CartRepo";

class CartService {
  private static instance: CartService;

  constructor() {
    if (CartService.instance) {
      return CartService.instance;
    }
    CartService.instance = this;
  }

  async create(newCart: CartModel) {
    try {
      const cart = await CartRepo.create(newCart);
      return cart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const carts = await CartRepo.findAll();
      return carts;
    } catch (error) {
      console.error("Error fetching carts:", error);
      throw new Error("Internal server error");
    }
  }

  async view(cartId: string) {
    try {
      const cart = await CartRepo.findById(cartId);
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error("Internal server error");
    }
  }

  async update(cartId: string, updateData: CartModel) {
    try {
      const cart = await CartRepo.update(cartId, updateData);
      return cart;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(cartId: string) {
    try {
      await CartRepo.delete(cartId);
    } catch (error) {
      console.error("Error deleting cart:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new CartService();
Object.freeze(instance);

export default instance;