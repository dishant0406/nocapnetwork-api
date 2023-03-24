import express from 'express'
import { AuthRoutes } from './Routes/index.js'
const app = express()

import { connectDB, passportConfig } from './utils/index.js'
import passport from 'passport'

connectDB()

passportConfig(passport)

app.use(passport.initialize())

app.use('/auth', AuthRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

