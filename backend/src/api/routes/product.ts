import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { deserializeUser } from "../middleware/deserializeUser";
import { isAuthorized } from "../middleware/isAuthorized";


const router:Router = Router();

//Routes

router
    .route("/")
    .get(ProductController.viewAll)

router
    .route("/")
    .all(deserializeUser, isAuthorized)
    .post(ProductController.create);

router
    .route("/:id")
    .all(deserializeUser, isAuthorized)
    .get(ProductController.view)
    .patch(ProductController.update)
    .delete(ProductController.delete);

router
    .route("/page/:page")
    .get(ProductController.viewPage);

export {router as productRouter}