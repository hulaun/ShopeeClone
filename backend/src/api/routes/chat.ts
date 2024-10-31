import e, { Router } from "express";
import ChatRoomController from "../controllers/ChatRoomController";


const router:Router = Router();
router
    .route("/")
    .get(ChatRoomController.viewAll)
    .post(ChatRoomController.create);

router
    .route("/:id")
    .get(ChatRoomController.view)
    .patch(ChatRoomController.update)
    .delete(ChatRoomController.delete);

router
    .route("/page/:page")
    .get(ChatRoomController.viewPage);

export {router as chatRouter}