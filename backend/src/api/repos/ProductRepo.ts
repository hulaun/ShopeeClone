import { db } from "../../config/db";
import { Product } from "../../../db/schema";
import { ProductModel } from "../models/model";
import { eq, sql } from "drizzle-orm";

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
      return product[0] as ProductModel;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findSome(page: number, limit: number, sortOption: string, sortOrder: string) {
    try{
      let query;
      // if(sortOption === 'role'){
        query = db.select().from(Product)
        // .where(eq(Product.role, sortOrder as 'Consumer' | 'Vendor'))
        .limit(limit)
        .offset((page-1)*limit)
      // }else{
      //   query = db.select().from(Product)
      //   // .where(not(eq(Product.role, 'Admin')))
      //   .limit(limit)
      //   .offset((page-1)*limit)
      // }
      return await query;
    }catch(error){
      console.log(error)
      return error
    }
  }

  async countPages(limit: number) {
    try{
      const num = await db.select({
        count: sql<number>`cast(count(${Product.id}) as int)`}).from(Product)
        return Math.ceil(num[0].count/limit)
    }catch(error){
      console.log(error)
      return error
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