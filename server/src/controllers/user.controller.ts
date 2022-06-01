import * as mongoose from 'mongoose'
import { check, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { UsersSchemaModel, IUserDocument } from '../models/user.model'
import { Logger } from '../helpers/logger.helper'

export const RegisterUser = async (req:Request, res:Response) => {
  const ValidationErrors = validationResult(req)
  if (!ValidationErrors.isEmpty()) return res.send({ errors: ValidationErrors.mapped() })
  else {
    const user:IUserDocument = new UsersSchemaModel(req.body)
    user.password = user.hashPassword(user.password)
    await user.save().catch((error:mongoose.Error) => { return Logger(null, { type: 'Database', severity: 'low', content: `Saving Error : ${error.message}` }) })
    return res.status(200).json({ message: 'Registration successful', IsAuthenticated: true, timestamp: Date.now })
  }
}
export const LoginUser = async (req:Request, res:Response) => {
  const ValidationErrors = validationResult(req)
  if (!ValidationErrors.isEmpty()) return res.send({ errors: ValidationErrors.mapped() })
  else {
    UsersSchemaModel.findOne({ email: req.body.email }, (error:mongoose.Error, user:IUserDocument) => {
      if (user === null) { error = { name: 'Unknown User', message: 'User not found' } }
      if (error) {
        Logger(null, { type: 'Database', severity: 'low', content: `Fetching User Error : ${error.message}` })
        return res.send({ errors: { email: { value: req.body.email, msg: 'User not found', param: 'email', location: 'body' } } })
      }
      if (user.comparePassword(req.body.password, user.password) === false) return res.send({ errors: { password: { value: req.body.password, msg: 'Wrong Password', param: 'password', location: 'body' } } })
      else {
        req.session.user = user
        req.session.IsAuthenticated = true
        return res.status(200).json({ message: 'Authentication successful', IsAuthenticated: true, timestamp: Date.now })
      }
    })
  }
}
export const LogoutUser = (req:Request, res:Response) => {
  req.session.destroy((error:Error) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Log Out Error : ${error.message}` })
      return res.status(500).json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now }
      )
    }
    return res.status(200).json({ IsAuthenticated: true, timestamp: Date.now })
  })
}
export const FetchUsers = async (req:Request, res:Response) => {
  try {
    const Users:IUserDocument = await UsersSchemaModel.find({}, ['name', 'email'])
    return res.send(Users)
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Fetch Users Error : ${error}` })
    return res.status(500).json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
  }
}
export const FetchUser = async (req:Request, res:Response) => {
  try {
    const User:IUserDocument = await UsersSchemaModel.findOne({ _id: req.params.userId }, ['name', 'email'])
    return res.send(User)
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Fetch User Error : ${error}` })
    return res.status(500).json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
  }
}
export const CheckAuthentication = async (req:Request, res:Response, next:NextFunction) => {
  if (req.session.IsAuthenticated === true) { return next() } else {
    return res.status(200).json({ error: true, message: 'Not authenticated', IsAuthenticated: false, timestamp: new Date().toDateString() })
  }
}
export const currentUser = async (req:Request, res:Response, next:NextFunction) => {
  if (req.session.user) {
    return UsersSchemaModel.find({ _id: req.session.user._id }, ['name', 'email']).exec((error:mongoose.Error, user:IUserDocument) => {
      if (error) {
        Logger(null, { type: 'Database', severity: 'low', content: `Self Fetching Error : ${error.message}` })
        return next()
      }
      return res.status(200).json({ user, IsAuthenticated: true })
    })
  }
  return res.status(200).json({ error: true, message: 'Not authenticated', IsAuthenticated: false, timestamp: new Date().toDateString() })
}
export const validationLogin = [
  check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email should be an email address'),
  check('password')
    .not().isEmpty().withMessage('Password is required')
    // .not().exists().withMessage('Password is null')
]
export const validationRegister = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email should be an email address'),
  check('name')
    .not().isEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name should be at least 2 letters')
    .matches(/^([A-z]|\s)+$/).withMessage('Name cannot have numbers'),
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
  check('email').custom(value => {
    return UsersSchemaModel.findOne({ email: value })
      .then((user:IUserDocument) => {
        if (user) {
          Logger(null, { type: 'Database', severity: 'medium', content: 'Saving Error : This email is already in use' })
          throw new Error('This email is already in use')
        }
      })
  }),
  check('passwordValidation').not().isEmpty()
    .withMessage('Confirm Password should not be empty')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    })]
