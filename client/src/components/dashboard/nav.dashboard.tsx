import React, { Component } from 'react'
import AuthService from '../../services/auth.service'
export default class DashboardNav extends Component {
  render () {
    return (
            <div>
            <div className="align-center btn-block">
                  <a className='btn btn-dark' href='/dashboard'>
                        Home
                  </a>
                  <a
                        className='btn btn-danger mr-1' href='/'
                        onClick={() => new AuthService().LogoutUser()}>
                        Logout
                   </a>
            </div>
            </div>
    )
  }
}
