import e, { Router } from "express";
import OrderController from "../controllers/OrderController";
import { deserializeUser } from "../middleware/deserializeUser";
import { isAuthorized } from "../middleware/isAuthorized";

const router:Router = Router();

router.use(deserializeUser, isAuthorized);

router
    .route("/")
    .get(OrderController.viewAll)

router
    .route("/vnpay")
    .post(OrderController.vnpayReturn);

router
    .route("/create_payment_url")
    .post(OrderController.createPaymentUrl);

router
    .route("/:id")
    .get(OrderController.view)
    .patch(OrderController.update)
    .delete(OrderController.delete);


export {router as orderRouter}