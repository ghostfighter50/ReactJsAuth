import React, { ChangeEvent, Component, FormEvent } from 'react'
import axios from 'axios'

interface IUser{
  Name?:string
  email?:string,
  password?:string,
  message?:string,
  errors?:any,
}
export default class Login extends Component<IUser, IUser> {
  constructor (state: IUser) {
    super(state)
    this.state = {
      Name: '',
      email: '',
      password: '',
      message: '',
      errors: null
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  submitHandler (e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(`${process.env.API_URL || 'http:///localhost:'}:${process.env.API_PORT || 8000}/api/login`, data, { timeout: 11000 }).then((res) => {
      if (res.data.errors) {
        return this.setState({ errors: res.data.errors })
      }
    })
  }

  changeHandler (e:ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case 'email': this.setState({ email: e.target.value }); break
      case 'password': this.setState({ password: e.target.value }); break
      default: return { error: 'Invalid \'Name\' property' }
    }
  }

  render () {
    return (

<div className="modal " id="LoginModal" tabIndex={-1} role="dialog" aria-labelledby="LoginModal" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Login</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={this.submitHandler}>
            <div className="form-group">
            {this.state.errors && this.state.errors.email && <div className="alert alert-danger" role="alert">{this.state.errors.email.msg}</div>}
                        <label htmlFor="email">Email address</label>
                        <input type="email" value={this.state.email} required name="email" onChange={this.changeHandler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
            {this.state.errors && this.state.errors.password && <div className="alert alert-danger" role="alert">{this.state.errors.password.msg}</div>}
                        <label htmlFor="password">Password</label>
                        <input onChange={this.changeHandler} value={this.state.password} required name="password" type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="col  text-center">
          <button className="btn btn-dark  btn-lg btn-block">Submit</button>
            </div>
      </form>
    </div>
  </div>
</div>
</div>
    )
  }
}
