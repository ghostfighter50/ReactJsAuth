import React, { Component } from 'react'
import axios, { AxiosResponse } from 'axios'
import Users from './users.dashboard'
import { Link } from 'react-router-dom'

axios.defaults.withCredentials = true

interface IUserRegister{
    name:string,
    email:string,
    password:string,
    passwordValidation:string,
    message:string,
    error:string,
  }

export default class DashboardMain extends Component<unknown, IUserRegister> {
  constructor (state: IUserRegister) {
    super(state)
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
      passwordValidation: '',
      error: ''
    }
    this.GetData = this.GetData.bind(this)
  }

  GetData ():void {
    axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/currentUser`)
      .then((res:AxiosResponse) => {
        console.log(res.data.IsAuthenticated)
        if (res.data.IsAuthenticated) {
          this.setState({ name: res.data.name })
          this.setState({ email: res.data.email })
          this.setState({ password: res.data.passwordValidation })
          this.setState({ passwordValidation: res.data.password })
          return true
        }
        return this.setState({ error: res.data.err, message: res.data.message })
      })
  }

  render () {
    if (this.state.error) {
      return (
            <div>
            <p>{this.state.message}</p>
            <Link to="/">Go Home</Link>
            </div>
      )
    }
    return (
            <div >
              {{ name: this.state.name, email: this.state.email, password: this.state.password, passwordValidation: this.state.passwordValidation } && <Users/>}
            </div>
    )
  }
}
