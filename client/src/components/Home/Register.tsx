import React, { Component, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

interface IUser{
  Name?: string,
  email?:string,
  password?:string,
  passwordValidation?:string,
  message?:string,
  errors?:any,
}

export default class Register extends Component<IUser, IUser> {
  constructor (state: IUser) {
    super(state)
    this.state = {
      Name: '',
      email: '',
      password: '',
      passwordValidation: '',
      message: '',
      errors: null
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  submitHandler (e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      Name: this.state.Name,
      email: this.state.email,
      password: this.state.password,
      passwordValidation: this.state.passwordValidation
    }
    axios.post(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/register`, data).then((res) => {
      if (res.data.errors !== undefined) {
        return this.setState({ errors: res.data.errors })
      }
    })
  }

  changeHandler (e:ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case 'Name': this.setState({ Name: e.target.value }); break
      case 'Email': this.setState({ email: e.target.value }); break
      case 'password': this.setState({ password: e.target.value }); break
      case 'passwordValidation': this.setState({ passwordValidation: e.target.value }); break
      default: return { error: 'Invalid \'Name\' property' }
    }
  }

  render () {
    return (
      <div>
      {this.state.message && <div className="alert alert-success" role="alert">{this.state.message}</div>}
      <form onSubmit={this.submitHandler} >
      <div className="row justify-content-center">
        <div className="jumbotron col-12 col-md-8 col-lg-8 col-xl-6">
          <div className="row">
            <div className="col text-center">
              <h1>Register</h1>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col mt-4">
            {this.state.errors && this.state.errors.Name && <div className="alert alert-danger" role="alert">{this.state.errors.Name.msg}</div>}
              <input type="text" autoComplete="Name" required onChange={this.changeHandler} name="Name" className="form-control" placeholder="Name" value={this.state.Name}></input>
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            {this.state.errors && this.state.errors.email && <div className="alert alert-danger" role="alert">{this.state.errors.email.msg}</div>}
              <input type="email" autoComplete="email" required onChange={this.changeHandler} name="Email" className="form-control" placeholder="Email" value={this.state.email}></input>
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
            {this.state.errors && this.state.errors.password && <div className="alert alert-danger" role="alert">{this.state.errors.password.msg}</div>}
              <input type="password" autoComplete="password" required onChange={this.changeHandler} name="password" className="form-control" placeholder="Password" value={this.state.password}></input>
              </div>
            <div className="col">
            {this.state.errors && this.state.errors.passwordValidation && <div className="alert alert-danger" role="alert">{this.state.errors.passwordValidation.msg}</div>}
              <input type="password" autoComplete="passwordValidation" required onChange={this.changeHandler} name="passwordValidation" className="form-control" placeholder="Repeat Password" value={this.state.passwordValidation}></input>
            </div>
          </div>
          <div className="row justify-content-start mt-4">
        <div className="col  text-center">
          <button className="btn btn-dark  btn-lg btn-block">Submit</button>
            </div>
          </div>
          <br>
          </br>
          <div className="alert alert-warning text-center ">
        Already have an account ?<button type="button" className="btn btn-link" data-toggle="modal" data-target="#LoginModal">Sign In</button>
        <button type="button"className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
      </div>
        </div>
      </div>
    </form>
    </div>
    )
  }
}
