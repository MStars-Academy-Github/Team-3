"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_1 = require("../../modules/media");
const router = express_1.default.Router();
router.post("/upload", media_1.mediaController.createMedia);
exports.default = router;
