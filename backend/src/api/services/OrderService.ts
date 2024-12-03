import { Order } from "../../../db/schema";
import { OrderModel } from "../models/model";
import OrderRepo from "../repos/OrderRepo";
import { format } from 'date-fns';

class OrderService {
  private static instance: OrderService;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }
    OrderService.instance = this;
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

  async vnpayReturn(orderId: string) {
    try {
      // const order:OrderModel = await OrderRepo.create(orderId);
      // if (!order) {
      //   throw new Error("Order not found");
      // }
      // if (order.status !== "pending") {
      //   throw new Error("Order has been processed");
      // }
      // order.status = "completed";
      // await OrderRepo.update(orderId, order);
      // return order;
    } catch (error) {
      console.error("Error handling VNPAY return:", error);
      throw new Error("Internal server error");
    }
  }

  async createPaymentUrl(userId: string, amount: number, cartId: string, ipAddr: any) {
    try {
      const newOrder = OrderRepo.create(userId, cartId, amount);
  
    
      var tmnCode = process.env.VNP_TMN_CODE;
      var secretKey = process.env.VNP_HASH_SECRET;
      var vnpUrl = process.env.VNP_URL;
      var returnUrl = process.env.VNP_RETURN_URL;
    
      var date = new Date();
    
      var createDate = format(date, 'yyyyMMddHHmmss');
      var orderId = format(date, 'HHmmss');
      var locale = 'vn'
      var currCode = 'VND';
      var vnp_Params:any = {
        vnp_Version:'2.1.0',
        vnp_Command:'pay',
        vnp_TmnCode:tmnCode,
        vnp_Locale:locale,
        vnp_CurrCode:currCode,
        vnp_TxnRef:orderId,
        vnp_OrderInfo:'Thanh toan cho ma GD:' + orderId,
        vnp_OrderType:'other',
        vnp_Amount:amount,
        vnp_ReturnUrl:returnUrl,
        vnp_IpAddr:ipAddr,
        vnp_CreateDate:createDate,
      };
    
      vnp_Params = this.sortObject(vnp_Params);
    
      var querystring = require('qs');
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
      return vnpUrl;
      // const order:OrderModel = await OrderRepo.create(orderId);
      // if (!order) {
      //   throw new Error("Order not found");
      // }
      // if (order.status !== "pending") {
      //   throw new Error("Order has been processed");
      // }
      // const paymentUrl = await PaymentService.createPaymentUrl(orderId);
      // return paymentUrl;
    } catch (error) {
      console.error("Error creating payment URL:", error);
      throw new Error("createPaymentUrl error");
    }
  }

  sortObject(obj:any) {
    let sorted:any = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }
}

const instance = new OrderService();
Object.freeze(instance);

export default instance;