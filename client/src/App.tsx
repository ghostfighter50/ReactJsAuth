import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import IndexMain from './components/index/main.index'
import DashboardMain from './components/dashboard/main.dashboard'
import DashboardDetails from './components/dashboard/details.dashboard'
export default function App ():ReactElement {
  return (
      <Router>
          <Routes>
            <Route path='/' element={<IndexMain/>}/>
            <Route path='/dashboard' element={<DashboardMain/>}/>
            <Route path='user/:userId' element={<DashboardDetails/>}/>
            <Route
            path="*"
            element={<Navigate to="/" replace />}
            />
          </Routes>
      </Router>
  )
}
