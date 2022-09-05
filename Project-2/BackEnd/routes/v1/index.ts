import express, { Router } from "express";
import { userValidationRules, validate } from  "../../modules/validation/validationmiddleware";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import mediaRoute from "./media.routes";
import registerRoute from "./register.route";

const router = express.Router();

interface IRoute {
  path: String;
  route: Router;
}

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/media", mediaRoute);
router.use("/register", userValidationRules(), validate, registerRoute);

export default router;
