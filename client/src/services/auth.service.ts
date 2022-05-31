import axios from 'axios'
axios.defaults.withCredentials = true

export default class AuthService {
  _IsAuthenticated:boolean | undefined
  constructor (IsAuthenticated?:boolean) {
    this._IsAuthenticated = IsAuthenticated
  }

  async RegisterUser (data:{name?:string, email?:string, password?:string, passwordValidation?:string}) {
    const res = await axios.post(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/register`, data)
    return res.data
  }

  async LoginUser (data:{email?:string, password?:string}) {
    const res = await axios.post(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/login`, data)
    return res.data
  }

  async LogoutUser () {
    await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/logout`).then(() => null)
  }
}
