import {Router} from "express";

const router:Router = Router();

const AuthController = require("../controllers/AuthController");

// router.post("/signup", AuthController.signup);
// router.post("/signin", AuthController.signin);
// router.get("/signin/oauth/google/login", AuthController.signinWithGoogleLogin);
// router.get(
//   "/signin/oauth/google/callback",
//   AuthController.signinWithGoogleCallback
// );
// router.post("/signin/oauth/facebook", AuthController.signin);

export {router as authRouter}
