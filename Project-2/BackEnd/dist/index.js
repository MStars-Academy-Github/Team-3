"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const v1_1 = __importDefault(require("./routes/v1"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_SERVER || "localhost";
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
}));
app.use("/v1", v1_1.default);
let server;
mongoose_1.default.connect(ATLAS_MONGO_SERVER).then(() => {
    console.log("connected to the mongodb");
    server = app.listen(PORT, () => {
        console.log("server is listening on the port " + PORT);
    });
});
