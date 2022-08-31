import express, { Router } from "express";
import { tokenService } from "../../modules/token";
import { userController } from "../../modules/user";

const router: Router = express.Router();

router.post("/", userController.createUser);

export default router;
