"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.ATLAS_MONGO_CONNECTION || "";
mongoose_1.default.connect(DB_CONNECTION).then(() => {
    console.log("Connected to  server ");
    app.listen(PORT, () => {
        console.log("server is listing to the port" + PORT);
    });
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
}));
app.use("/users", userRouter_1.default);
