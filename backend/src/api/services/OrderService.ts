import { OrderModel } from "../models/model";
import OrderRepo from "../repos/OrderRepo";

class OrderService {
  private static instance: OrderService;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }
    OrderService.instance = this;
  }

  async create(newOrder: OrderModel) {
    try {
      const order = await OrderRepo.create(newOrder);
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const orders = await OrderRepo.findAll();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Internal server error");
    }
  }

  async view(orderId: string) {
    try {
      const order = await OrderRepo.findById(orderId);
      return order;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw new Error("Internal server error");
    }
  }

  async update(orderId: string, updateData: OrderModel) {
    try {
      const order = await OrderRepo.update(orderId, updateData);
      return order;
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(orderId: string) {
    try {
      await OrderRepo.delete(orderId);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new OrderService();
Object.freeze(instance);

export default instance;