
import { Router } from 'express'
import { getUser, updateUser } from '../../Controller/UserController/index.js'


const router = Router()

//update information route
router.put('/update/me', updateUser)

//get user information route
router.get('/me', getUser)

export default router
