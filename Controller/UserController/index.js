import { User } from "../../Modals/index.js";
import dotenv from 'dotenv';
dotenv.config();
import { asyncMiddleware } from "../../utils/index.js";


const updateUser = asyncMiddleware(async (req, res) => {
  const id = req.user._id;
  const { displayName, username, bio, walletAddress, website, twitter, instagram, email } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 400 });
  }
  //update user
  user.displayName = displayName || user.displayName;
  //check if username is not already taken
  if (username && username !== user.username) {
    //find user with same username
    const usernameUser = await User.find({ username })
    if (usernameUser.length > 0) {
      throw Object.assign(new Error("Username already taken"), { status: 400 });
    }
    user.username = username;
  }

  user.bio = bio || user.bio;
  user.walletAddress = walletAddress || user.walletAddress;
  user.socials.website = website || user.socials.website;
  user.socials.twitter = twitter || user.socials.twitter;
  user.socials.instagram = instagram || user.socials.instagram;
  user.email = email || user.email;
  await user.save();
  res.status(200).json({ user, success: true });

})

const getUser = asyncMiddleware(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 400 });
  }
  res.status(200).json({ user, success: true });

})

export {
  updateUser,
  getUser
}