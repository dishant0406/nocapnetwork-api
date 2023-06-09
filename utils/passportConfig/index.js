import oAuth from 'passport-google-oauth2';
const { Strategy: GoogleStrategy } = oAuth
import { User } from '../../Modals/index.js'
import dotenv from 'dotenv';
dotenv.config();

const passportConfig = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV ? "https://nocapnetwork-api.vercel.app/auth/google/callback" : 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        let existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        console.log('Creating new user...');
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.email,
            profilePic: profile.picture
          }
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false)
      }
    }
  ));
}

export default passportConfig