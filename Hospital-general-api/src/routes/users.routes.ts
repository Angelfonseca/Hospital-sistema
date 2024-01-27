import { Router } from 'express'
import controller from '../controllers/users.controller'
import ensureAuth from '../Middlewares/auth.middleware'

const router = Router()

router.get('/', controller.getUsers)
router.post('/', controller.createUser)
router.post('/auth/login', controller.login)

export default router