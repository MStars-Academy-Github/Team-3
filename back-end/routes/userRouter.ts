import express, { Request, Response } from "express";
import userController from "../controller/UserController";
import verifyToken from "../middleware/authenticattion";
const router = express.Router();
router.post("/getUser", verifyToken, userController.getUsers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
export default router;
