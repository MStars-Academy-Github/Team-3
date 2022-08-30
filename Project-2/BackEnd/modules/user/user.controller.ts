import { Request, Response } from "express";
import * as userServices from "./user.services";

export const createUser = async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  res.send(user);
};
