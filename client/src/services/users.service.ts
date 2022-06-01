import axios from 'axios'
axios.defaults.withCredentials = true

export default class UsersService {
  async FetchUsers () {
    const res = await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/users`)
    return res.data
  }

  async FetchUser (id?:string) {
    const res = await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/user/${id}`)
    return res.data
  }

  async GetCurrentUser () {
    const res = await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/currentUser`)
    return res.data
  }

  async GetSession () {
    const res = await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/auth`)
    return res.data
  }
}
