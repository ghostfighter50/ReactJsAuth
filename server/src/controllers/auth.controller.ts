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
    return res.json({ message: 'Registration successful', IsAuthenticated: true, timestamp: Date.now() })
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
      if (user.roles.includes('BANNED') === true) { return res.send({ errors: { password: { value: req.body.password, msg: 'Wrong Password', param: 'password', location: 'body' } } }) } else if (user.comparePassword(req.body.password, user.password) === false) return res.send({ errors: { password: { value: req.body.password, msg: 'Wrong Password', param: 'password', location: 'body' } } })
      else {
        req.session.user = user
        req.session.IsAuthenticated = true
        return res.json({ message: 'Authentication successful', IsAuthenticated: true, timestamp: Date.now() })
      }
    })
  }
}
export const LogoutUser = (req:Request, res:Response) => {
  req.session.destroy((error:Error) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Log Out Error : ${error.message}` })
      return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now() }
      )
    }
    return res.json({ IsAuthenticated: true, timestamp: Date.now() })
  })
}

export const CheckAuthentication = async (req:Request, res:Response, next:NextFunction) => {
  if (req.session.IsAuthenticated === true) { return next() } else {
    return res.status(204).json({ error: true, message: 'Not authenticated', IsAuthenticated: false, timestamp: new Date().toDateString() })
  }
}

export const validationLogin = [
  check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email should be an email address'),
  check('password')
    .not().isEmpty().withMessage('Password is required')
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
