import express from 'express'
import { AuthRoutes, WalletRoute, ArtistFactoryRoute, UserRoute } from './Routes/index.js'
import Web3 from 'web3';
import dotenv from 'dotenv';
import contractABI from './utils/Contract/FactoryABI.json' assert { type: 'json' };
const app = express()
import cors from 'cors'

import { connectDB, passportConfig, middleware } from './utils/index.js'
import passport from 'passport'

dotenv.config();
export const web3 = new Web3('https://frosty-ancient-gadget.matic-testnet.discover.quiknode.pro/efa57e997b5d28b2415ab401c385d4897aed97e5/');

// Create a contract instance
export const contractAddress = process.env.CONTRACT_ADDRESS; // Replace with your contract's address
export const myContract = new web3.eth.Contract(contractABI, contractAddress);

const { protectRoute, ErrorHandler } = middleware

connectDB()

passportConfig(passport)

app.use(passport.initialize())
app.use(cors())

//json parser
app.use(express.json())

app.use('/auth', AuthRoutes)
app.use('/wallet', WalletRoute)
app.use('/artist', ArtistFactoryRoute)
app.use('/user', protectRoute, UserRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(ErrorHandler)

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

