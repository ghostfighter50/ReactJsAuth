import * as usersController from '../controllers/users.controller'
import * as authController from '../controllers/auth.controller'
import { Request, Response, Router } from 'express'
const authUser = authController.CheckAuthentication
const UserRouter = Router()

UserRouter.get('/', authUser, usersController.FetchUsers)
UserRouter.get('/id/:userId', authUser, usersController.FetchUser)
UserRouter.get('/currentUser', authUser, usersController.GetCurrentUser)
UserRouter.get('/currentRoles', authUser, usersController.GetRoles)
UserRouter.put('/admin/:userId', authUser, usersController.CheckAdmin, usersController.SetAdmin)
UserRouter.put('/ban/:userId', authUser, usersController.CheckAdmin, usersController.SetBan)
UserRouter.use('/*', (req:Request, res:Response) => { return res.status(200).json({ error: true, message: 'Unknown API route' }) })

export default UserRouter
