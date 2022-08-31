import mongoose from "mongoose";
import { IUserDoc } from "../user/user.interfaces";
import { getUserByEmail } from "../user/user.services";

export const loginUser = async (
  email: string,
  password: string
): Promise<IUserDoc> => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error("incorrect email or Password");
  }
  return user;
};
