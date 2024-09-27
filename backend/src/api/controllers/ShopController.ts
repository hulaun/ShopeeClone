import { Request, Response, NextFunction } from "express";
import ShopService from "../services/ShopService";

class ShopController {
  private static instance: ShopController;

  constructor() {
    if (ShopController.instance) {
      return ShopController.instance;
    }
    ShopController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const shops = await ShopService.viewAll();
      res.json(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId: string = req.params.id;
      const shop = await ShopService.view(shopId);
      res.json(shop);
    } catch (error) {
      console.error("Error fetching shop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newShop = req.body;
      const shop = await ShopService.create(newShop);
      res.status(201).json(shop);
    } catch (error) {
      console.error("Error creating shop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId: string = req.params.id;
      const updateData = req.body;
      const shop = await ShopService.update(shopId, updateData);
      res.status(200).json(shop);
    } catch (error) {
      console.error("Error updating shop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId: string = req.params.id;
      await ShopService.delete(shopId);
      res.status(200).json({ message: "Shop deleted successfully" });
    } catch (error) {
      console.error("Error deleting shop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new ShopController();
Object.freeze(instance);

export default instance;