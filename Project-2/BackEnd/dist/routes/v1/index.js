"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const media_routes_1 = __importDefault(require("./media.routes"));
const register_route_1 = __importDefault(require("./register.route"));
const validationmiddleware_1 = require("../../modules/validation/validationmiddleware");
const router = express_1.default.Router();
router.use("/users", user_route_1.default);
router.use("/auth", auth_route_1.default);
router.use("/media", media_routes_1.default);
router.use("/register", (0, validationmiddleware_1.userValidationRules)(), validationmiddleware_1.validate, register_route_1.default);
exports.default = router;
