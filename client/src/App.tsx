import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import IndexMain from './components/index/main.index'
import DashboardMain from './components/dashboard/main.dashboard'
import DashboardDetails from './components/dashboard/details.dashboard'
import AdminMain from './components/admin/main.admin'
import PrivateRoute from './routes/private.route'
import PublicRoute from './routes/public.route'
import AdminRoute from './routes/admin.route'

export default function App ():ReactElement {
  return (
      <Router>
          <Routes>
            <Route path='/admin' element={<AdminRoute />}>
              <Route path='' element={<AdminMain/>}/>
            </Route>
            <Route path='/users' element={<PrivateRoute/>}>
              <Route path=':userId' element={<DashboardDetails/>}/>
              <Route path='' element={<DashboardMain/>}/>
            </Route>
            <Route path='' element={<PublicRoute/>}>
              <Route path='/' element={<IndexMain/>}/>
            </Route>
          </Routes>
      </Router>
  )
}
