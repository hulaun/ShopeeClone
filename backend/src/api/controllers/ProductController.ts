import { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  private static instance: ProductController;

  constructor() {
    if (ProductController.instance) {
      return ProductController.instance;
    }
    ProductController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.viewAll();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: string = req.params.id;
      const product = await ProductService.view(productId);
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewPage(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const page = parseInt(req.params.page as string) ||1;
      const limit = parseInt(req.query.limit as string)||10;
      const sortOption = req.query.sort as string || "name";
      const sortOrder = req.query.order as string || "asc";
      const data = await ProductService.viewPage(page, limit, sortOption, sortOrder);
      res.json({
        data:data,
        message:"Users fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newProduct = req.body;
      const product = await ProductService.create(newProduct);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: string = req.params.id;
      const updateData = req.body;
      const product = await ProductService.update(productId, updateData);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: string = req.params.id;
      await ProductService.delete(productId);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new ProductController();
Object.freeze(instance);

export default instance;