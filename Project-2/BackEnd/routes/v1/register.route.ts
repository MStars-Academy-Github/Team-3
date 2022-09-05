import express, { Router } from "express";
import { tokenService } from "../../modules/token";
import { userController } from "../../modules/user";
import { userValidationRules, validate } from  "../../modules/validation/validationmiddleware";

const router: Router = express.Router();

router.post("/", userValidationRules(), validate ,userController.createUser);

export default router;