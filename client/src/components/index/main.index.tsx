import React, { Component } from 'react'
import IndexLogin from './login.index'
import IndexRegister from './register.index'

export default class IndexMain extends Component {
  render () {
    return (
      <div className='container'>
        <IndexRegister/>
        <IndexLogin />
      </div>
    )
  }
}
