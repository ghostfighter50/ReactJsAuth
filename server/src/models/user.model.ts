import { Schema, Document, model } from 'mongoose'
import { hashSync, compareSync } from 'bcryptjs'

export interface IUserDocument extends Document {
  name: string,
  email: string,
  password:string,
  createdAt:Date,
  updatedAt:Date,
  hashPassword(password:string):string,
  comparePassword(password:string, hashedPassword:string):boolean
}
export const UserSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { type: Date, default: Date.now }
})

UserSchema.methods.hashPassword = (password:string) => {
  return hashSync(password, 12)
}

UserSchema.methods.comparePassword = (password:string, hashedPassword:string) => {
  return compareSync(password, hashedPassword)
}

export const UsersSchemaModel = model('User', UserSchema)
