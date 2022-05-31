import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'
export default class DashboardNav extends Component {
  render () {
    return (
            <div>
            <div className="align-center">
                  <Link className='btn btn-dark' to='/dashboard'>
                        Home
                  </Link>
                  <Link
                        className='btn btn-danger' to='/'
                        onClick={() => new AuthService().LogoutUser()}>
                        Logout
                   </Link>
            </div>
            </div>
    )
  }
}
