import { Router } from "express";
import UserController from "../controllers/UserController";
import { deserializeUser } from "../middleware/deserializeUser";


const router:Router = Router();

//Middleware
router.use("/", deserializeUser);
router.use("/:id", deserializeUser);
router.use("/page/:page", deserializeUser);

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