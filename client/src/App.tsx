import React, { ReactElement, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Home from './components/Home/Home'
import Main from './components/Dashboard/Main'
import Userdetail from './components/Dashboard/Userdetail'
import axios, { AxiosResponse } from 'axios'
import Protected from './components/Dashboard/Protected'
export default function App ():ReactElement {
  const params = useParams()
  const [IsAuthenticated, setAuthenticated] = useState(false)
  const CheckAuthentication = () => {
    axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/session`).then((res:AxiosResponse) => {
      if (res.data.IsAuthenticated === true) {
        setAuthenticated(true)
        return IsAuthenticated
      }
    })
  }
  CheckAuthentication()

  return (
      <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={
            <Protected IsAuthenticated={IsAuthenticated}>
            <Main/>
            </Protected>
            }/>
            <Route path='/user/:userId' element={
            <Protected IsAuthenticated={IsAuthenticated}>
            <Userdetail userId={params}/>
            </Protected>
            }/>
          </Routes>
      </Router>
  )
}
