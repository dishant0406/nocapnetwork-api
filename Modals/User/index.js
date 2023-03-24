import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { Schema } = mongoose

const UserSchema = new Schema({
  google: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;