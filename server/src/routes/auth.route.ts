import * as usersController from '../controllers/user.controller'
import { Request, Response, Router } from 'express'
const authUser = usersController.CheckAuthentication
const router = Router()

router.get('/ping', (req:Request, res:Response) => res.send('poing'))
router.post('/register', usersController.validationRegister, usersController.ResgisterUser)
router.get('/users', authUser, usersController.FetchUsers)
router.get('/user/:userId', authUser, usersController.FecthUser)
router.post('/login', usersController.validationlogin, usersController.LoginUser)
router.get('/currentUser', authUser, usersController.currentUser)
router.get('/session', authUser, (req:Request, res:Response) => { return res.status(200).json({ session: req.session.user, IsAuthenticated: req.session.IsAuthenticated }) })
router.get('/logout', usersController.LogoutUser)
router.use('/*', (req:Request, res:Response) => { return res.status(200).json({ error: true, message: 'Unknown API route' }) })

export default router
