"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UsersSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    imgURL: {
        type: String,
    },
    age: {
        type: Number,
    },
    sex: {
        type: String,
    },
    hobby: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    seekingFor: {
        type: String,
    },
    interest: [String],
    liked: [
        {
            name: String,
            email: String,
            age: String,
        },
    ],
});
const Users = mongoose_1.default.model("users", UsersSchema);
exports.default = Users;
