import * as usersController from '../Controllers/UserController'
import { Request, Response, Router } from 'express'
const authUser = usersController.authenticateUser
const router = Router()

router.get('/ping', (req:Request, res:Response) => res.send('poing'))
router.post('/register', usersController.validationRegister, usersController.createUser)
router.get('/users', authUser, usersController.getAllUsers)
router.get('/users/:userId', authUser, usersController.findUser)
router.post('/login', usersController.validationlogin, usersController.loginUser)
router.get('/currentUser', authUser, usersController.currentUser)
router.get('/session', authUser, (req:Request, res:Response) => {return res.status(200).json({ session: req.session.user , IsAuthenticated : req.session.IsAuthenticated })})
router.get('/logout', usersController.logoutUser)
router.post('/*', (req:Request, res:Response) => { return res.status(200).json({ error: true, message: 'Unknown API route' })})
router.get('/test',  usersController.getAllUsers)

export default router
