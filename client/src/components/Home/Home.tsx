import React, { Component } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Login from './Login';
import Register from './Register';
const Redirect = useNavigate()

interface getCurrentUser {
  getCurrentUser():void
}

export default class Home extends Component<any, getCurrentUser> {
  state:getCurrentUser = {
    getCurrentUser() {
      axios.get(`${process.env.API_URL}:${process.env.API_PORT}/api/currentUser`)
      .then((res:AxiosResponse)=>{
          if(res.data.IsAuthenticated){
             return(Redirect(`/dashboard`))
          }
          else return Redirect(`/`)
      })
    },
  }
  render() {
    return (
      <div className='container'>
        <Register/>
        <Login />
      </div>
    )
  }
}
