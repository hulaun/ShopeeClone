import {Express}from 'express';
import {userRouter} from "./user";
import {authRouter} from "./auth";
import {shopRouter} from "./shop";
import {chatRouter} from "./chat";
import {orderRouter} from './order';
import {productRouter} from './product';
import {cartRouter} from './cart';
import {productCategoryRouter} from './productCategory';

function route(app: Express) {
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/shop", shopRouter);
    app.use("/chat", chatRouter);
    app.use("/order", orderRouter);
    app.use("/cart", cartRouter);
    app.use("/product", productRouter);
    app.use("/product-category", productCategoryRouter);
}

module.exports = route;
