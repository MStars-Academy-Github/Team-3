import mongoose, { Schema } from "mongoose";
import { IUserDoc, IUserModel } from "./user.interfaces";
import bcrypt from "bcryptjs";

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

userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
export default User;
