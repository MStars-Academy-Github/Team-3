import { Request, Response } from "express";
import * as userServices from "./user.services";

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await userServices.createUser(req.body);
  res.send(user);
};
// export function loginUser(arg0: string, loginUser: any) {
//     throw new Error("Function not implemented.");
// }
