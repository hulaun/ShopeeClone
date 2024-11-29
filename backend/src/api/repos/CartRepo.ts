import { db } from "../../config/db";
import { Cart, CartProductsRelations, Product } from "../../../db/schema";
import { CartModel, ProductModel } from "../models/model";
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
      const cart = await db.select({
          id: CartProductsRelations.productId,
          quantity: CartProductsRelations.quantity,
          price: CartProductsRelations.price,
          name: Product.name,
          image: Product.productPicture,
        })
        .from(CartProductsRelations)
        .innerJoin(Product,eq(CartProductsRelations.productId,Product.id))
        .where(eq(CartProductsRelations.cartId, cartId))
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(userId: string) {
    try {
      const cart = await db
        .insert(Cart)
        .values({
          userId: userId,
        })
        .returning({ id: Cart.id, userId: Cart.userId });
      return cart[0];
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addToCart(cartId: string, product: ProductModel, quantity: number) {
    try {
      console.log("cartId",cartId);
      const cart = await db
        .insert(CartProductsRelations)
        .values({
          cartId: cartId,
          productId: product.id,
          quantity: quantity,
          price: product.price?product.price*quantity:0,
        })
        .returning({ cartId: CartProductsRelations.cartId, productId: CartProductsRelations.productId });
      return cart[0];
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

}

const instance = new CartRepo();
Object.freeze(instance);

export default instance;