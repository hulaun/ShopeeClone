import { ProductCategoryModel } from "../models/model";
import ProductCategoryRepo from "../repos/ProductCategoryRepo";

class ProductCategoryService {
  private static instance: ProductCategoryService;

  constructor() {
    if (ProductCategoryService.instance) {
      return ProductCategoryService.instance;
    }
    ProductCategoryService.instance = this;
  }

  async create(newCategory: ProductCategoryModel) {
    try {
      const category = await ProductCategoryRepo.create(newCategory);
      return category;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const categories = await ProductCategoryRepo.findAll();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Internal server error");
    }
  }

  async view(categoryId: string) {
    try {
      const category = await ProductCategoryRepo.findById(categoryId);
      return category;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error("Internal server error");
    }
  }

  async update(categoryId: string, updateData: ProductCategoryModel) {
    try {
      const category = await ProductCategoryRepo.update(categoryId, updateData);
      return category;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(categoryId: string) {
    try {
      await ProductCategoryRepo.delete(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new ProductCategoryService();
Object.freeze(instance);

export default instance;