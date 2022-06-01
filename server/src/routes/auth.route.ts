import * as usersController from '../controllers/user.controller'
import { Request, Response, Router } from 'express'
const authUser = usersController.CheckAuthentication
const router = Router()

router.get('/ping', (req:Request, res:Response) => res.send('poing'))
router.post('/register', usersController.validationRegister, usersController.RegisterUser)
router.get('/users', authUser, usersController.FetchUsers)
router.get('/user/:userId', authUser, usersController.FetchUser)
router.post('/login', usersController.validationLogin, usersController.LoginUser)
router.get('/currentUser', authUser, usersController.currentUser)
router.get('/auth', authUser, (req:Request, res:Response) => { return res.status(200).json({ IsAuthenticated: req.session.IsAuthenticated }) })
router.get('/logout', usersController.LogoutUser)
router.use('/*', (req:Request, res:Response) => { return res.status(200).json({ error: true, message: 'Unknown API route' }) })

export default router
