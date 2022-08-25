import express, { Request, Response } from "express";
import userController from "../controller/UserController";
import verifyToken from "../middleware/authenticattion";
const router = express.Router();
<<<<<<< HEAD
router.post("/getAllUser", userController.getUsers);
=======
router.post("/getUser", verifyToken, userController.getUsers);
>>>>>>> ce44650a8137bf1bedf378f6eeb902a6e8fc508d
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
export default router;
