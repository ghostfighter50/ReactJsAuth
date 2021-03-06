import React, { Component } from 'react'
import DashboardUsers from './users.dashboard'
import UsersService from './../../services/users.service'
import { IUserMain } from './../../interfaces/dashboard.interfaces'

export default class DashboardMain extends Component<unknown, IUserMain> {
  constructor (state: IUserMain) {
    super(state)
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
      passwordValidation: '',
      error: ''
    }
  }

  componentDidMount () {
    new UsersService().GetCurrentUser().then((data) => {
      this.setState({ name: data.name })
      this.setState({ email: data.email })
      this.setState({ password: data.passwordValidation })
      this.setState({ passwordValidation: data.password })
      this.setState({ error: data.err, message: data.message })
    })
  }

  render () {
    if (this.state.error) {
      return (
        <div>
          <p>{this.state.message}</p>
          <a href="/">Go Home</a>
        </div>
      )
    }
    return (
      <div>
        {{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          passwordValidation: this.state.passwordValidation
        } && <DashboardUsers />}
      </div>
    )
  }
}
