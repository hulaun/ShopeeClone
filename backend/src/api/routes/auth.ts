import {Router} from "express";
import AuthController from "../controllers/AuthController";
const router:Router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.get("/signin/oauth/google/login", AuthController.signinWithGoogleLogin);
router.get(
  "/signin/oauth/google/callback",
  AuthController.signinWithGoogleCallback
);
router.post("/signin/oauth/facebook", AuthController.signin);

export {router as authRouter}
