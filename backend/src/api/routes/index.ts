import {Express}from 'express';
import {userRouter} from "./user";
import {authRouter} from "./auth";
import {shopRouter} from "./shop";

function route(app: Express) {
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/shop", shopRouter);
}

module.exports = route;
