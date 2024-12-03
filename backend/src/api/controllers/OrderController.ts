import { Request, Response, NextFunction } from "express";
import OrderService from "../services/OrderService";
import { Order } from "../../../db/schema";

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

  async vnpayReturn(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId: string = req.query.orderId as string;
      const order = await OrderService.vnpayReturn(orderId);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error returning from VNPay:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createPaymentUrl(req: Request, res: Response, next: NextFunction) {
    const ipAddr = req.headers['x-forwarded-for']||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;
    const amount = req.body.amount;
    const cartId = req.body.cartId;
    const user = res.locals.user;
    console.log("user",user);
    console.log("ipAddr",ipAddr);
    console.log("amount",amount);
    console.log("cartId",cartId);
    const vnpUrl = await OrderService.createPaymentUrl(user.id, amount,cartId, ipAddr);
    console.log("vnpUrl",vnpUrl);
    res.json({
      url:vnpUrl
    });
  }
}

const instance = new OrderController();
Object.freeze(instance);

export default instance;