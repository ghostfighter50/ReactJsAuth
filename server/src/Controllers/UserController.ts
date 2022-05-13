/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import * as mongoose from 'mongoose'
import { check, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { UsersSchemaModel, IUserDocument } from '../Models/UserModel'
import { Logger } from '../Utilities/Logger'

/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function createUser (req:Request, res:Response, next:NextFunction) {
  const user:any = new UsersSchemaModel(req.body)
  user.password = user.hashPassword(user.password)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() })
  } else {
    await user.save().catch((error:Error) => { return Logger(null, { type: 'Database', severity: 'low', content: `Saving Error : ${error.message}` }) })
    return res.redirect(`${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/dashboard`)
  }
}
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */

export async function getAllUsers (req:Request, res:Response, next:NextFunction) {
  await UsersSchemaModel.find({}, ['Name', 'email']), (error:mongoose.Error, users:Array<IUserDocument>) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Fetching Users Error : ${error.message}` })
      return next()
    }
    res.json(users)
  }
  return res.json('Server error').sendStatus(500)
}

/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */

export async function loginUser (req:Request, res:Response, next:NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() })
  } else {
    await UsersSchemaModel.findOne({ email: req.body.email }, (error:mongoose.Error, user:any) => {
      if (error) {
        Logger(null, { type: 'Database', severity: 'low', content: `Fetching User Error : ${error.message}` })
        return next()
      }
      if (user.comparePassword(req.body.password, user.password) === false) {
        return res.send({ errors: { password: { value: req.body.password, msg: 'Wrong Password', param: 'password', location: 'body' } } })
      } else {
        req.session.user = user
        req.session.IsAuthenticated = true
        return res.redirect(`${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/dashboard`)
      };
    })
  }
}
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function logoutUser (req:Request, res:Response, next:NextFunction) {
  req.session.destroy((error:Error) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Log Out Error : ${error.message}` })
      return next()
    }
    res.json({ ok: true })
  })
}
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function authenticateUser (req:Request, res:Response, next:NextFunction) {
  if (req.session.IsAuthenticated === true) return next()
  else { res.json({ error: 'Not authenticated' }).sendStatus(403); return res.redirect('/') }
}
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function currentUser (req:Request, res:Response, next:NextFunction) {
  if (req.session.user) {
    return await UsersSchemaModel.find({ _id: req.session.user._id }, ['Name', 'email']).exec((error:mongoose.Error, user:IUserDocument) => {
      if (error) {
        Logger(null, { type: 'Database', severity: 'low', content: `Self Fetching Error : ${error.message}` })
        return next()
      }
      return res.json({ user, IsAuthenticated: true })
    })
  }
  res.json({ error: 'Not authenticated' }).sendStatus(403)
}
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function findUser (req:Request, res:Response, next:NextFunction) {
  await UsersSchemaModel.findOne({ _id: req.params.userId }, ['Name', 'email']).exec((user:IUserDocument, error:mongoose.Error) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Find User Error : ${error.message}` })
      return next()
    }
    res.json(user)
  })
}
export const validationlogin = [
  check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email should be an email address'),
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
]
export const validationRegister = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email should be an email address'),
  check('Name')
    .not().isEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name should be at least 2 letters')
    .matches(/^([A-z]|\s)+$/).withMessage('Name cannot have numbers'),
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
  check('email').custom(value => {
    return UsersSchemaModel.findOne({ email: value })
      .then(async function (user) {
        if (user) {
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
