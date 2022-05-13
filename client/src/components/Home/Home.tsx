import React, { Component } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

export default class Home extends Component {
  getCurrentUser () {
    const Redirect = useNavigate()
    axios.get(`${process.env.API_URL || 'http:///localhost:'}:${process.env.API_PORT || 8000}/api/currentUser`)
      .then((res:AxiosResponse) => {
        if (res.data.IsAuthenticated) {
          return (Redirect('/dashboard'))
        } else return Redirect('/')
      })
  }

  render () {
    return (
      <div className='container'>
        <Register/>
        <Login />
      </div>
    )
  }
}
