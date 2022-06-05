import * as authController from '../controllers/auth.controller'
import { Request, Response, Router } from 'express'
const authUser = authController.CheckAuthentication
const AuthRouter = Router()

AuthRouter.get('/', authUser, (req: Request, res: Response) => {
  return res.status(200).json({ IsAuthenticated: req.session.IsAuthenticated })
})
AuthRouter.post(
  '/register',
  authController.validationRegister,
  authController.RegisterUser
)
AuthRouter.post(
  '/login',
  authController.validationLogin,
  authController.LoginUser
)
AuthRouter.get('/logout', authController.LogoutUser)
AuthRouter.use('/*', (req: Request, res: Response) => {
  return res.status(404).json({ error: true, message: 'Unknown API route' })
})

export default AuthRouter
