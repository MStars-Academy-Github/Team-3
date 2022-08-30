import mongoose, { Schema } from "mongoose";
import { IUserDoc } from "./user.interfaces";

const userSchema = new Schema<IUserDoc>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: true,
  },
  register: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
});

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
