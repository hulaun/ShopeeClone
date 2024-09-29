import { Request, Response, NextFunction } from "express";
import OrderService from "../services/OrderService";

class OrderController {
  private static instance: OrderController;

  constructor() {
    if (OrderController.instance) {
      return OrderController.instance;
    }
    OrderController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderService.viewAll();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId: string = req.params.id;
      const order = await OrderService.view(orderId);
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newOrder = req.body;
      const order = await OrderService.create(newOrder);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId: string = req.params.id;
      const updateData = req.body;
      const order = await OrderService.update(orderId, updateData);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId: string = req.params.id;
      await OrderService.delete(orderId);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new OrderController();
Object.freeze(instance);

export default instance;