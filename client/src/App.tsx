import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import IndexMain from './components/index/main.index'
import DashboardMain from './components/dashboard/main.dashboard'
import DashboardDetails from './components/dashboard/details.dashboard'
import PrivateRoute from './routes/private.route'
import PublicRoute from './routes/public.route'
export default function App ():ReactElement {
  return (
      <Router>
          <Routes>
            <Route path='/manage' element={<PrivateRoute/>}>
              <Route path='users' element={<DashboardMain/>}/>
              <Route path='user/:userId' element={<DashboardDetails/>}/>
            </Route>
            <Route path='/' element={<PublicRoute/>}>
              <Route path='' element={<IndexMain/>}/>
            </Route>
            <Route
            path="*"
            element={<Navigate to="/" replace />}
            />
          </Routes>
      </Router>
  )
}
