import { Router } from "express";
import ProductCategoryController from "../controllers/ProductCategoryController";
import { ProductCategory } from "../../../db/schema";

const router:Router = Router();

//Routes
router
    .route("/")
    .get(ProductCategoryController.viewAll)
    .post(ProductCategoryController.create);

router
    .route("/:id")
    .get(ProductCategoryController.view)
    .patch(ProductCategoryController.update)
    .delete(ProductCategoryController.delete);

router
    .route("/page/:page")
    .get(ProductCategoryController.viewPage);

export {router as productCategoryRouter}