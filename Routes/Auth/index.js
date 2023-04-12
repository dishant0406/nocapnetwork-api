import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const router = Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

const env = process.env.NODE_ENV || 'development';

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  jwt.sign(
    { user: req.user },
    process.env.JWT_SECRET,
    { expiresIn: '3d' },
    (err, token) => {
      if (err) {
        return res.json({
          token: null,
        });
      }
      if (env === 'development') {
        return res.redirect(`http://localhost:5000/?token=${token}`);
      }
      res.redirect(`https://art-island.vercel.app/?token=${token}`);
    }
  );
})



export default router