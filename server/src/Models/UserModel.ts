import {Schema, Document, model} from 'mongoose';
import {hashSync, compareSync} from 'bcryptjs';
export const IUser = new Schema({
    Name: String,
    email: String,
    password:String,
    createdAt:{
        type: Date, 
        default: Date.now 
    },
    updatedAt:{type:Date, default:Date.now}
})

/**
 * @param  {string} password
*/
IUser.methods.hashPassword= function(password:string) {
    return  hashSync(password, 12)
}
/**
 * @param  {string} password
 * @param  {string} hashedPassword
 */
IUser.methods.comparePassword = function(password, hashedPassword) {
    return  compareSync(password, hashedPassword)
}
export interface IUserDocument extends Document {
    Name: string,
    email: string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    hashPassword(password:string):any
} 
export const UsersSchemaModel =  model(`User`, IUser);
