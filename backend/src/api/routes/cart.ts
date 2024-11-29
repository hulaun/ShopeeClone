import { Router } from "express";
import CartController from "../controllers/CartController";
import { deserializeUser } from "../middleware/deserializeUser";
import { isAuthorized } from "../middleware/isAuthorized";


const router:Router = Router();

//Routes

router
    .route("/")
    .all(deserializeUser, isAuthorized)
    .post(CartController.createAndAddToCart);
    
router
    .route("/:id")
    .get(CartController.view)
    .all(deserializeUser, isAuthorized)
    .post(CartController.addToCart)

export {router as cartRouter}