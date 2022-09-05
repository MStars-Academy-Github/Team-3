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
exports.getMediaByUserId = exports.getMediaById = exports.createMedia = void 0;
const user_1 = require("../user");
const formidable_1 = __importDefault(require("formidable"));
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const fs_1 = __importDefault(require("fs"));
let gridfs;
mongoose_1.default.connection.on("connected", () => {
    gridfs = new mongoose_1.default.mongo.GridFSBucket(mongoose_1.default.connection.db);
});
const createMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = new formidable_1.default.IncomingForm();
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(400).json({
                error: "video could not uploaded",
            });
        }
        const user = yield user_1.User.findById("630ef583ac9a86b055977e31");
        let media = new _1.Media(fields);
        media.postedBy = user === null || user === void 0 ? void 0 : user.id;
        const file = files["media"];
        console.log(fields);
        // save the parsed file
        if (file) {
            let writeStream = gridfs.openUploadStream(media._id.toString(), {
                contentType: "binary/octet-stream",
            });
            fs_1.default.createReadStream(file.filepath).pipe(writeStream);
        }
        try {
            let result = yield media.save();
            res.status(200).json({ data: result });
        }
        catch (err) {
            return res.status(400).json({
                err: "error during file upload",
            });
        }
    }));
});
exports.createMedia = createMedia;
const getMediaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mediaId } = req.params;
    try {
        const media = yield _1.Media.findById(mediaId)
            .populate("postedBy", "_id firstName lastName")
            .exec();
        let files = yield gridfs
            .find({ filename: media === null || media === void 0 ? void 0 : media._id.toString() })
            .toArray();
        console.log(files);
        res.json({
            data: media,
            file: files,
        });
    }
    catch (error) {
        res.status(404).json({
            error: "could not retrieve media file",
        });
    }
});
exports.getMediaById = getMediaById;
const getMediaByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log(userId);
    try {
        const media = yield _1.Media.find({ postedBy: userId });
        res.status(200).json({ data: media });
    }
    catch (error) {
        res.status(404).json({
            error: "could not retrieve media file",
        });
    }
});
exports.getMediaByUserId = getMediaByUserId;
