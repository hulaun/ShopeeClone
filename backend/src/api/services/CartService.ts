import { CartModel, ProductModel } from "../models/model";
import CartRepo from "../repos/CartRepo";

class CartService {
  private static instance: CartService;

  constructor() {
    if (CartService.instance) {
      return CartService.instance;
    }
    CartService.instance = this;
  }
  async view(cartId: string) {
    return await CartRepo.findById(cartId);
  }

  async createAndAddToCart(userId: string, product: ProductModel, quantity: number) {
    const cart:CartModel = await CartRepo.create(userId) as CartModel;
    console.log("cart",cart);
    return await CartRepo.addToCart(cart.id, product, quantity);
  }

  async addToCart(cartId: string, product: ProductModel, quantity: number) {
    return await CartRepo.addToCart(cartId, product, quantity);
  }
}

const instance = new CartService();
Object.freeze(instance);

export default instance;