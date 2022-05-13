import React, { Component } from 'react'
import axios from 'axios'
import Users from './Users'
import { Link } from 'react-router-dom'
axios.defaults.withCredentials = true

interface IUser{
    Name:string,
    email:string,
    password:string,
    passwordValidation:string,
    message:string,
    error:string,
  }

class Main extends Component<unknown, IUser> {
  constructor (state: IUser) {
    super(state)
    this.state = {
      Name: '',
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
      .then((res) => {
        if (res.data.IsAuthenticated) {
          this.setState({ Name: res.data.Name })
          this.setState({ email: res.data.email })
          this.setState({ password: res.data.passwordValidation })
          this.setState({ passwordValidation: res.data.password })
          return true
        }
        return this.setState({ error: res.data.err, message: res.data.message })
      })
  }

  render () {
    this.GetData()
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
              {{ Name: this.state.Name, email: this.state.email, password: this.state.password, passwordValidation: this.state.passwordValidation } && <Users/>}
            </div>
    )
  }
}

export default Main
