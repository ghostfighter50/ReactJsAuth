import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../../services/auth.service'

interface IUserLogin{
  name?:string
  email?:string,
  password?:string,
  message?:string,
  errors?:any,
  IsAuthenticated?:boolean
}
export default class IndexLogin extends Component<unknown, IUserLogin> {
  constructor (state: IUserLogin) {
    super(state)
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
      errors: null,
      IsAuthenticated: undefined
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
    new AuthService().LoginUser(data).then(results => {
      this.setState({ errors: results.errors })
      this.setState({ IsAuthenticated: results.IsAuthenticated })
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
{this.state.IsAuthenticated === true && <Navigate to="/users" replace/>}
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Login</h5>
        {this.state.message && <div className="alert alert-success" role="alert">{this.state.message}</div>}
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={this.submitHandler}>
            <div className="form-group">
            {this.state.errors && this.state.errors.email && <div className="alert alert-danger" role="alert"><i className="fa fa-warning"></i>  {this.state.errors.email.msg}</div>}
                        <label htmlFor="email">Email address</label>
                        <input type="email" value={this.state.email} required name="email" onChange={this.changeHandler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
            {this.state.errors && this.state.errors.password && <div className="alert alert-danger" role="alert"><i className="fa fa-warning"></i>  {this.state.errors.password.msg}</div>}
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
