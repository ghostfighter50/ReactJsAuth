export interface IUserLogin {
    name?:string
    email?:string,
    password?:string,
    message?:string,
    errors?:any,
    IsAuthenticated?:boolean
  }
export interface IUserRegister {
    name?: string,
    email?:string,
    password?:string,
    passwordValidation?:string,
    message?:any,
    errors?:any,
  }
