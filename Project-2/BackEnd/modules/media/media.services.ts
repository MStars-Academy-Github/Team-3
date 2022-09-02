import mongoose from "mongoose";
import { IMediaDoc } from "./media.interfaces";
import Media from "./media.model";

export function createMedia(body: any) {
  // console.log("user service layer");
  // console.log(body);

  return Media.create(body);
}

// export const getMediaById = async (email: string): Promise<IMediaDoc | null> =>
//   Media.findOne({ email });
