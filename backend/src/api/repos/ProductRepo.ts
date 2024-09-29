import { db } from "../../config/db";
import { Product } from "../../../db/schema";
import { ProductModel } from "../models/model";
import { eq } from "drizzle-orm";

class ProductRepo {
  private static instance: ProductRepo;

  constructor() {
    if (ProductRepo.instance) {
      return ProductRepo.instance;
    }
    ProductRepo.instance = this;
  }

  async findAll() {
    try {
      const products = await db.select().from(Product);
      return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(productId: string) {
    try {
      const product = await db.select().from(Product).where(eq(Product.id, productId));
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(newProduct: ProductModel) {
    try {
      const product = await db
        .insert(Product)
        .values({
          ...newProduct
        })
        .returning({ insertedId: Product.id, name: Product.name });
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(productId: string) {
    try {
      const product = await db
        .delete(Product)
        .where(eq(Product.id, productId))
        .returning({ id: Product.id, name: Product.name });
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(productId: string, updatedColumns: ProductModel) {
    try {
      const product = await db
        .update(Product)
        .set({ ...updatedColumns })
        .where(eq(Product.id, productId))
        .returning();
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new ProductRepo();
Object.freeze(instance);

export default instance;