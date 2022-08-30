import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  imgURL: {
    type: String,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  hobby: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  seekingFor: {
    type: String,
  },
  interest: [String],
  liked: [
    {
      name: String,
      email: String,
      age: String,
    },
  ],
});
const Users = mongoose.model("users", UsersSchema);

export default Users;
