import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Nav extends Component {
  render () {
    return (
            <div>
            <div className="align-center">
                  <Link className='btn btn-dark' to='/dashboard'>
                        Home
                  </Link>
                  <Link
                        className='btn btn-danger' to='/'
                        onClick={() => axios.get(`${process.env.API_URL || 'http:///localhost:'}:${process.env.API_PORT || 8000}/api/logout`).then(() => null)}>
                        Logout
                   </Link>
            </div>
            </div>
    )
  }
}

export default Nav
