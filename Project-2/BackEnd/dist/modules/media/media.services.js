"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaById = exports.createMedia = void 0;
const media_model_1 = __importDefault(require("./media.model"));
function createMedia(body) {
    // console.log("user service layer");
    // console.log(body);
    return media_model_1.default.create(body);
}
exports.createMedia = createMedia;
const getMediaById = (email) => __awaiter(void 0, void 0, void 0, function* () { return media_model_1.default.findOne({ email }); });
exports.getMediaById = getMediaById;
