import express from 'express'
import { AuthRoutes, WalletRoute } from './Routes/index.js'
const app = express()
import cors from 'cors'

import { connectDB, passportConfig } from './utils/index.js'
import passport from 'passport'

connectDB()

passportConfig(passport)

app.use(passport.initialize())
app.use(cors())

//json parser
app.use(express.json())

app.use('/auth', AuthRoutes)
app.use('/wallet', WalletRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

