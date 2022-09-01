"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const router = express_1.default.Router();
router.get("/getUser/:email", UserController_1.default.getUsers);
router.post("/", UserController_1.default.createUser);
router.post("/login", UserController_1.default.loginUser);
router.post("/interest", UserController_1.default.notFilerting);
router.post("/liked", UserController_1.default.likedUser);
exports.default = router;
