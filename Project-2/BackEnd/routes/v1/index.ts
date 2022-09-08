import express, { Router } from "express";

import userRoute from "./user.route";
import authRoute from "./auth.route";
import mediaRoute from "./media.routes";

const router = express.Router();

interface IRoute {
  path: String;
  route: Router;
}

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/media", mediaRoute);

export default router;
