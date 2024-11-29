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
  
  async createAndAddToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      const product = req.body.product;
      const quantity = req.body.quantity;
      const cart = await CartService.createAndAddToCart(user.id, product, quantity);
      res.status(201).json(cart);
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId: string = req.params.id;
      const product = req.body.product;
      const quantity = req.body.quantity;
      const cart = await CartService.addToCart(cartId, product, quantity);
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

}

const instance = new CartController();
Object.freeze(instance);

export default instance;