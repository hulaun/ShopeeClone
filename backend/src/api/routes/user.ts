import { Router } from "express";
import UserController from "../controllers/UserController";


const router:Router = Router();
router
    .route("/")
    .get(UserController.viewAll)
    .post(UserController.create);

router
    .route("/:id")
    .get(UserController.view)
    .patch(UserController.update)
    .delete(UserController.delete);

router
    .route("/page/:page")
    .get(UserController.viewPage);

export {router as userRouter}