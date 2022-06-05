import * as mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { UsersSchemaModel, IUserDocument } from '../models/user.model'
import { Logger } from '../helpers/logger.helper'

export const DeleteUser = async (req:Request, res:Response) => {
  const user = await UsersSchemaModel.findByIdAndDelete(req.params.id)
  if (user === null) {
    Logger(null, { type: 'Database', severity: 'low', content: 'Deleting User Error : User not found' })
    return res.status(404).json({ error: true, message: 'User not found', timestamp: Date.now })
  }
  return res.json({ message: 'User deleted', timestamp: Date.now() })
}

export const UpdateUser = async (req:Request, res:Response) => {
  const user = await UsersSchemaModel.findByIdAndUpdate(req.params.id, req.body)
  if (user === null) {
    Logger(null, { type: 'Database', severity: 'low', content: 'Updating User Error : User not found' })
    return res.status(404).json({ error: true, message: 'User not found', timestamp: Date.now })
  }
  return res.json({ message: 'User updated', timestamp: Date.now() })
}

export const FetchUsers = async (req:Request, res:Response) => {
  try {
    const users:any = await UsersSchemaModel.find({}, ['name', 'email', 'roles'])
    return res.send(users)
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Fetch Users Error : ${error}` })
    return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
  }
}
export const FetchUser = async (req:Request, res:Response) => {
  try {
    const User:IUserDocument = await UsersSchemaModel.findOne({ _id: req.params.userId }, ['name', 'email'])
    return res.send(User)
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Fetch User Error : ${error}` })
    return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
  }
}
export const GetCurrentUser = async (req:Request, res:Response, next:NextFunction) => {
  return UsersSchemaModel.find({ _id: req.session.user._id }, ['name', 'email', 'roles']).exec((error:mongoose.Error, user:any) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Self Fetching Error : ${error.message}` })
      return next()
    }
    return res.json({ user, IsAuthenticated: true })
  })
}

export const GetRoles = async (req:Request, res:Response, next:NextFunction) => {
  return UsersSchemaModel.find({ _id: req.session.user._id }, ['roles']).exec((error:mongoose.Error, user:any) => {
    if (error) {
      Logger(null, { type: 'Database', severity: 'low', content: `Self Fetching Roles Error : ${error.message}` })
      return next()
    }
    return res.send({ roles: user[0].roles, IsAuthenticated: true })
  })
}
export const SetAdmin = async (req:Request, res:Response) => {
  try {
    const User:IUserDocument = await UsersSchemaModel.findOne({ _id: req.params.userId }, ['name', 'email', 'roles'])
    User.updateOne({ $push: { roles: 'ADMIN' }, $pull: { roles: 'USER' } }, {}, (error:mongoose.Error) => {
      if (error) {
        Logger(null, { type: 'Database', severity: 'medium', content: `Set Admin Error : ${error.message}` })
        return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
      }
      Logger({ type: 'USERS', content: 'Admin set successfully' }, null)
      return res.send({ status: 'OK', message: 'Admin set successfully' })
    })
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Set Admin Error : ${error}` })
    return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: true, timestamp: Date.now })
  }
}
export const SetBan = async (req:Request, res:Response) => {
  try {
    const User:IUserDocument = await UsersSchemaModel.findOne({ _id: req.params.userId }, ['name', 'email', 'roles'])
    if (User.roles.includes('ADMIN')) {
      Logger(null, { type: 'Database', severity: 'medium', content: 'Set Admin Error : Cannot ban an ADMIN user' })
      return res.json({ error: true, message: 'Cannot ban an ADMIN user', IsAuthenticated: true, timestamp: Date.now })
    }
    User.updateOne({ $push: { roles: 'BANNED' } }, {}, (error:mongoose.Error) => {
      if (error) {
        Logger(null, { type: 'Database', severity: 'medium', content: `Set Admin Error : ${error.message}` })
        return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: true, timestamp: Date.now })
      }
      Logger({ type: 'USERS', content: 'Admin set successfully' }, null)
      return res.send({ status: 'OK', message: 'Admin set successfully' })
    })
  } catch (error:unknown) {
    Logger(null, { type: 'Database', severity: 'low', content: `Fetch User Error : ${error}` })
    return res.json({ error: true, message: 'Internal Server Error', IsAuthenticated: null, timestamp: Date.now })
  }
}
export const CheckAdmin = async (req:Request, res:Response, next:NextFunction) => {
  if (req.session.user) {
    return UsersSchemaModel.find({ _id: req.session.user._id }, ['name', 'email', 'roles']).exec((error:mongoose.Error, user:any) => {
      if (error) {
        return res.json({ error: true, message: 'Internal Server Error', timestamp: Date.now })
      }
      if (user.roles.includes('ADMIN')) {
        return next()
      } else {
        return res.json({ error: true, message: 'User is not an admin', timestamp: Date.now })
      }
    })
  } else {
    return res.json({ error: true, message: 'You must be authenticated', IsAuthenticated: false, timestamp: new Date().toDateString() })
  }
}
