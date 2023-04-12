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
    profilePic: {
      type: String,
    }
  },
  displayName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  walletAddress: {
    type: String,
    default: "",
  },
  socials: {
    website: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    }
  }
});

const User = mongoose.model("User", UserSchema);

export default User;