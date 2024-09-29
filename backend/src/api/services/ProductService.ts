import { ProductModel } from "../models/model";
import ProductRepo from "../repos/ProductRepo";

class ProductService {
  private static instance: ProductService;

  constructor() {
    if (ProductService.instance) {
      return ProductService.instance;
    }
    ProductService.instance = this;
  }

  async create(newProduct: ProductModel) {
    try {
      const product = await ProductRepo.create(newProduct);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const products = await ProductRepo.findAll();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Internal server error");
    }
  }

  async view(productId: string) {
    try {
      const product = await ProductRepo.findById(productId);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Internal server error");
    }
  }

  async update(productId: string, updateData: ProductModel) {
    try {
      const product = await ProductRepo.update(productId, updateData);
      return product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(productId: string) {
    try {
      await ProductRepo.delete(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new ProductService();
Object.freeze(instance);

export default instance;