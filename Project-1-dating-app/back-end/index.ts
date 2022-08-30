import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import userRouter from "./routes/userRouter";
import cors from "cors";
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.ATLAS_MONGO_CONNECTION || "";

mongoose.connect(DB_CONNECTION).then(() => {
  console.log("Connected to  server ");
  app.listen(PORT, () => {
    console.log("server is listing to the port" + PORT);
  });
});
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
  })
);
app.use("/users", userRouter);
