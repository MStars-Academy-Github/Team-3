import express, { Express, Response, Request } from "express";
const app: Express = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Team3");
});
app.post("/post", (req: Request, res: Response) => {
  res.send("successfully post");
});
app.listen(4000, () => {
  console.log(`Server is running ${PORT}`);
});
