import mongoose from "mongoose";
import { IUserDoc } from "./user.interfaces";
import User from "./user.modules";

export function createUser(body: any) {
  // console.log("user service layer");
  // console.log(body);

  return User.create(body);
}
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });

// export const getUserByPhone = async (register: string): Promise<IUserDoc | null> =>
//   User.findOne({ register });
