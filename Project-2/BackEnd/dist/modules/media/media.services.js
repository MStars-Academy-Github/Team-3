"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedia = void 0;
const media_model_1 = __importDefault(require("./media.model"));
function createMedia(body) {
    // console.log("user service layer");
    // console.log(body);
    return media_model_1.default.create(body);
}
exports.createMedia = createMedia;
// export const getMediaById = async (email: string): Promise<IMediaDoc | null> =>
//   Media.findOne({ email });
