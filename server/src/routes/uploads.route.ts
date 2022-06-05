import * as uploadsController from '../controllers/uploads.controller'
import * as authController from '../controllers/auth.controller'
import { Request, Response, Router } from 'express'
const CheckFile = uploadsController.CheckFile
const authUser = authController.CheckAuthentication

const UploadsRouter = Router()

UploadsRouter.get('/', authUser, uploadsController.FetchFiles)
UploadsRouter.get('/file/:id', authUser, uploadsController.FetchFile)
UploadsRouter.post('/new', authUser, CheckFile, uploadsController.UploadFile)
UploadsRouter.get('/delete/:id', authUser, uploadsController.DeleteFile)
UploadsRouter.use('/*', (req: Request, res: Response) => {
  return res.status(404).json({ error: true, message: 'Unknown API route' })
})

export default UploadsRouter
