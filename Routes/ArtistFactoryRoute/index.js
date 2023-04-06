import { Router } from 'express'
import { Wallet } from '../../Modals/index.js'
import dotenv from 'dotenv';
import { deployArtist, signTransaction } from '../../Controller/ArtistFactory/index.js';
dotenv.config();


const router = Router()

router.post('/create-transaction', deployArtist);

router.post('/interact/signed', signTransaction);

export default router