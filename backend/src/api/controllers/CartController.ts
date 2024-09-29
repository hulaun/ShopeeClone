import { Request, Response, NextFunction } from "express";
import CartService from "../services/CartService";

class CartController {
  private static instance: CartController;

  constructor() {
    if (CartController.instance) {
      return CartController.instance;
    }
    CartController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const carts = await CartService.viewAll();
      res.json(carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId: string = req.params.id;
      const cart = await CartService.view(cartId);
      res.json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCart = req.body;
      const cart = await CartService.create(newCart);
      res.status(201).json(cart);
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId: string = req.params.id;
      const updateData = req.body;
      const cart = await CartService.update(cartId, updateData);
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId: string = req.params.id;
      await CartService.delete(cartId);
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      console.error("Error deleting cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new CartController();
Object.freeze(instance);

export default instance;