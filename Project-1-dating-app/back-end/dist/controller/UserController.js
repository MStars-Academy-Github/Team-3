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
const users_1 = __importDefault(require("../model/users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const findExistingUser = yield users_1.default.find({ email: email });
    if (findExistingUser) {
        const randomAggergate = yield users_1.default.aggregate([
            {
                $match: {
                    email: { $nin: findExistingUser[0].interest },
                },
            },
            { $match: { sex: { $in: [findExistingUser[0].seekingFor] } } },
            { $sample: { size: 1 } },
        ]);
        res.status(200).json({
            success: true,
            data: randomAggergate,
        });
    }
});
const notFilerting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { interest, id } = req.body;
    try {
        yield users_1.default.updateOne({ _id: id }, { $push: { interest: interest } });
        res.status(200).json({
            success: true,
            message: "Амжилттай",
        });
        next();
    }
    catch (err) {
        console.log(err);
    }
});
const likedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age, id } = req.body;
    try {
        yield users_1.default.updateOne({ _id: id }, { $push: { liked: { name: name, email: email, age: age } } });
        res.status(200).json({
            success: true,
            message: "Амжилттай боллоо",
        });
        next();
    }
    catch (err) {
        console.error(err);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, age, sex, hobby, email, password, seekingFor, imgURL, } = req.body;
    const foundUser = yield users_1.default.findOne({
        firstName: firstName,
        lastName: lastName,
    });
    if (foundUser) {
        res.json({
            success: false,
            data: "User allready exits",
        });
    }
    else {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const tokenKey = process.env.TOKEN_KEY || "password";
        const token = jsonwebtoken_1.default.sign({ firstName: firstName }, tokenKey, {
            expiresIn: "2h",
        });
        const createdUser = yield users_1.default.create({
            firstName,
            lastName,
            age,
            sex,
            hobby,
            email,
            hashedPassword,
            seekingFor,
            imgURL,
        });
        if (createdUser) {
            res.json({
                success: true,
                message: "User creation was succesfully",
                data: createdUser,
                token: token,
            });
        }
        else {
            res.json({
                success: false,
                message: "User creation was unsuccess",
                data: {},
            });
        }
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        console.log(params);
        if (Object.values(params).length === 0) {
            res.status(400).json({
                success: false,
                message: "No user data provided",
            });
        }
        const { email, password } = params;
        const findExistingUser = yield users_1.default.find({ email: email });
        if (findExistingUser.length === 0) {
            res.status(400).json({
                success: false,
                message: "User data doesn't exit",
            });
        }
        if (yield bcryptjs_1.default.compare(password, findExistingUser ? findExistingUser[0].hashedPassword : "thisidnotValid")) {
            const tokenKey = process.env.TOKEN_KEY || "password";
            const token = jsonwebtoken_1.default.sign({ firstName: findExistingUser[0].firstName }, tokenKey, { expiresIn: "2h" });
            res.status(200).json({
                success: true,
                token: token,
                email: findExistingUser[0].email,
                id: findExistingUser[0]._id,
                name: findExistingUser[0].firstName,
                age: findExistingUser[0].age,
                message: "Амжилттай нэвтэрлээ",
            });
        }
        else {
            res.status(401).json({
                success: false,
                data: "Хэрэглэгчийн мэдээллээ зөв оруулна уу",
            });
        }
    }
    catch (err) {
        console.log(err.message);
        next(err);
    }
});
exports.default = { getUsers, createUser, loginUser, notFilerting, likedUser };
