import e, { Router } from "express";
import ChatRoomController from "../controllers/ChatRoomController";
import { deserializeUser } from "../middleware/deserializeUser";
import { isAuthorized } from "../middleware/isAuthorized";

const router:Router = Router();

router.use(deserializeUser, isAuthorized);

router
    .route("/")
    .get(ChatRoomController.viewAll)
    .post(ChatRoomController.create);

router
    .route("/most-recently-visited")
    .get(ChatRoomController.viewMostRecentlyVisited);

router
    .route("/:id")
    .get(ChatRoomController.view)
    .patch(ChatRoomController.update)
    .delete(ChatRoomController.delete);

router
    .route("/page/:page")
    .get(ChatRoomController.viewPage);

export {router as chatRouter}