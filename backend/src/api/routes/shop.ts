import e, { Router } from "express";
import ShopController from "../controllers/ShopController";


const router:Router = Router();
router
    .route("/")
    .get(ShopController.viewAll)
    .post(ShopController.create);

router
    .route("/:id")
    .get(ShopController.view)
    .patch(ShopController.update)
    .delete(ShopController.delete);

export {router as shopRouter}