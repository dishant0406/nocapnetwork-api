import { Router } from 'express'
import { Wallet } from '../../Modals/index.js'
import dotenv from 'dotenv';
dotenv.config();


const router = Router()

router.post('/create', async (req, res) => {
  console.log('Called')
  const { walletAddress, email } = req.body;
  try {
    const findWallet = await Wallet.findOne({ walletAddress });
    if (findWallet) {
      return res.status(400).json({ error: "Wallet already exists" });
    }

    const wallet = await Wallet.create({ walletAddress, email });
    res.status(200).json({ wallet, success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}
)

export default router
