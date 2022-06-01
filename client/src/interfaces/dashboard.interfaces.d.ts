export interface IUserDashboard {
    name:string,
    email:string,
    userId:string,
}
export interface IUserUsers{
    name?: string,
    email?: string,
    password?:string,
    _id?: string
}

export interface IUsersList {
    users:Array<any>
}

export interface IUserMain {
    name:string,
    email:string,
    password:string,
    passwordValidation:string,
    message:string,
    error:string,
}
