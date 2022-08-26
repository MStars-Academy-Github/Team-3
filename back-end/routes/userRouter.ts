import express, { Request, Response, Router } from "express";
import userController from "../controller/UserController";
import verifyToken from "../middleware/authenticattion";
const router = express.Router();
router.get("/getUser/:email", userController.getUsers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/interest", userController.notFilerting);
export default router;
