import mongoose from "mongoose";
import { IMediaDoc } from "./media.interfaces";
import Media from "./media.model";

export function createMedia(body: any) {
  return Media.create(body);
}
