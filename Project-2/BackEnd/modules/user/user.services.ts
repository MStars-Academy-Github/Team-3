import mongoose from "mongoose";
import User from "./user.modules";

export function createUser(body: any) {
  return User.create(body);
}
