import * as usersController from '../controllers/auth.controller'
import { Request, Response, Router } from 'express'
const authUser = usersController.CheckAuthentication
const AuthRouter = Router()

AuthRouter.get('/', authUser, (req:Request, res:Response) => { return res.status(200).json({ IsAuthenticated: req.session.IsAuthenticated }) })
AuthRouter.post('/register', usersController.validationRegister, usersController.RegisterUser)
AuthRouter.post('/login', usersController.validationLogin, usersController.LoginUser)
AuthRouter.get('/logout', usersController.LogoutUser)
AuthRouter.use('/*', (req:Request, res:Response) => { return res.status(200).json({ error: true, message: 'Unknown API route' }) })

export default AuthRouter
