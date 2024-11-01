import { Router } from "express";
import UserController from "../controllers/UserController";
import { deserializeUser } from "../middleware/deserializeUser";
import { isAuthorized } from "../middleware/isAuthorized";


const router:Router = Router();

//Middleware
router.use(deserializeUser, isAuthorized);

//Routes
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