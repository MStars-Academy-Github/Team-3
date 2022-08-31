import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/v1";
import cors from "cors";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_SERVER || "localhost";

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "DELETE", "PUT", "POST"],
  })
);

app.use("/v1", routes);

let server: any;
mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("connected to the mongodb");
  server = app.listen(PORT, () => {
    console.log("server is listening on the port " + PORT);
  });
});
