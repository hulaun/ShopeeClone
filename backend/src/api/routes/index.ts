import {Express}from 'express';
import {userRouter} from "./user";
import {authRouter} from "./auth";

function route(app: Express) {
    app.use("/user", userRouter);
    // app.use("/auth", authRouter);
}

module.exports = route;
