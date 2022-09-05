"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../modules/user");
const validationmiddleware_1 = require("../../modules/validation/validationmiddleware");
const router = express_1.default.Router();
router.post("/", (0, validationmiddleware_1.userValidationRules)(), validationmiddleware_1.validate, user_1.userController.createUser);
exports.default = router;
