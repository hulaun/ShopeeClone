import { db } from "../../config/db";
import { ProductCategory } from "../../../db/schema";
import { ProductCategoryModel } from "../models/model";
import { eq, sql } from "drizzle-orm";

class ProductCategoryRepo {
  private static instance: ProductCategoryRepo;

  constructor() {
    if (ProductCategoryRepo.instance) {
      return ProductCategoryRepo.instance;
    }
    ProductCategoryRepo.instance = this;
  }

  async findAll() {
    try {
      const categories = await db.select().from(ProductCategory);
      return categories;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(categoryId: string) {
    try {
      const category = await db.select().from(ProductCategory).where(eq(ProductCategory.id, categoryId));
      return category;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findSome(page: number, limit: number, sortOption: string, sortOrder: string) {
    try{
      let query;
      // if(sortOption === 'role'){
        query = db.select().from(ProductCategory)
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
        count: sql<number>`cast(count(${ProductCategory.id}) as int)`}).from(ProductCategory)
        return Math.ceil(num[0].count/limit)
    }catch(error){
      console.log(error)
      return error
    }
  }

  async create(newCategory: ProductCategoryModel) {
    try {
      const category = await db
        .insert(ProductCategory)
        .values({
          ...newCategory
        })
        .returning({ insertedId: ProductCategory.id, name: ProductCategory.name });
      return category;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(categoryId: string) {
    try {
      const category = await db
        .delete(ProductCategory)
        .where(eq(ProductCategory.id, categoryId))
        .returning({ id: ProductCategory.id, name: ProductCategory.name });
      return category;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(categoryId: string, updatedColumns: ProductCategoryModel) {
    try {
      const category = await db
        .update(ProductCategory)
        .set({ ...updatedColumns })
        .where(eq(ProductCategory.id, categoryId))
        .returning();
      return category;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new ProductCategoryRepo();
Object.freeze(instance);

export default instance;