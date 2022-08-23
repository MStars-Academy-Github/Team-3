import express, { Request, Response } from "express";
import userController from "../controller/UserController";
const router = express.Router();
router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.post("/intrest", userController.intrestUser);
router.post("/login", userController.loginUser);
export default router;
