import { Request, Response } from "express";
import { User } from "../user";
import * as mediaServices from "./media.services";

export const createMedia = async (req: Request, res: Response) => {
  console.log(req.body);

  const media = await mediaServices.createMedia(req.body);
  res.send(media);
};
