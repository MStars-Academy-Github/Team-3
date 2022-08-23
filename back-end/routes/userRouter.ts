import express, { Request, Response } from "express";
import userController from "../controller/UserController";
const router = express.Router();
router.get("/", userController.getUsers);
router.post("/", userController.createUser);
export default router;
