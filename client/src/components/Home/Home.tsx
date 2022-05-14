import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export default class Home extends Component {
  render () {
    return (
      <div className='container'>
        <Register/>
        <Login />
      </div>
    )
  }
}
