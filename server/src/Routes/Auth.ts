import * as usersController from '../Controllers/UserController';
import { Request, Response, NextFunction, Router } from 'express';
const authUser = usersController.authenticateUser;
const router = Router()

router.get(`/ping`, (req:Request,res:Response)=>res.send(`poing`));
router.post(`/register`, usersController.validationRegister, usersController.createUser );
router.get(`/users/`, authUser,  usersController.getAllUsers);
router.get(`/users/:userId`, authUser,  usersController.findUser);
router.post(`/login`, usersController.validationlogin, usersController.loginUser);
router.get(`/currentUser`,authUser, usersController.currentUser);
router.get(`/session`,authUser, (req:Request, res:Response)=>res.json({session:req.session.user}));
router.get(`/logout`, usersController.logoutUser);
router.post(`/*`, (req:Request,res:Response)=>res.json({error:true, message: `Server error`}));
    
export default router