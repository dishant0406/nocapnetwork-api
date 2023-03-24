import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const router = Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  jwt.sign(
    { user: req.user },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.json({
          token: null,
        });
      }
      res.redirect(`https://art-island.vercel.app/?token=${token}`);
    }
  );
})


export default router