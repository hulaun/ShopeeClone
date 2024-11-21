import { Request, Response, NextFunction } from "express";
import ProductCategoryService from "../services/ProductCategoryService";

class ProductCategoryController {
  private static instance: ProductCategoryController;

  constructor() {
    if (ProductCategoryController.instance) {
      return ProductCategoryController.instance;
    }
    ProductCategoryController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await ProductCategoryService.viewAll();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId: string = req.params.id;
      const category = await ProductCategoryService.view(categoryId);
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
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
      const data = await ProductCategoryService.viewPage(page, limit, sortOption, sortOrder);
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
      const newCategory = req.body;
      const category = await ProductCategoryService.create(newCategory);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId: string = req.params.id;
      const updateData = req.body;
      const category = await ProductCategoryService.update(categoryId, updateData);
      res.status(200).json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId: string = req.params.id;
      await ProductCategoryService.delete(categoryId);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new ProductCategoryController();
Object.freeze(instance);

export default instance;