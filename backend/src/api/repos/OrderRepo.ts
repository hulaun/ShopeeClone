import { db } from "../../config/db";
import { Order } from "../../../db/schema";
import { OrderModel } from "../models/model";
import { eq } from "drizzle-orm";

class OrderRepo {
  private static instance: OrderRepo;

  constructor() {
    if (OrderRepo.instance) {
      return OrderRepo.instance;
    }
    OrderRepo.instance = this;
  }

  async findAll() {
    try {
      const orders = await db.select().from(Order);
      return orders;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(orderId: string) {
    try {
      const order = await db.select().from(Order).where(eq(Order.id, orderId));
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(userId: string, cartId: string, amount: number) {
    try {
      const order = await db
        .insert(Order)
        .values({
          userId: userId,
          cartId: cartId,
          totalAmount: amount,
          status: "Pending",
        })
        .returning({ 
          id: Order.id, 
          userId: Order.userId, 
          cartId: Order.cartId, 
          totalAmount: Order.totalAmount, 
          status: Order.status
         });
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(orderId: string) {
    try {
      const order = await db
        .delete(Order)
        .where(eq(Order.id, orderId))
        .returning({ id: Order.id, userId: Order.userId });
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(orderId: string, updatedColumns: OrderModel) {
    try {
      const order = await db
        .update(Order)
        .set({ ...updatedColumns })
        .where(eq(Order.id, orderId))
        .returning();
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new OrderRepo();
Object.freeze(instance);

export default instance;