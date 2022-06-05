import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingMain from '../components/loading/loading.main'
import UsersService from '../services/users.service'

const AdminRoute: any = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [IsAdmin, setAdmin] = useState<boolean | undefined>(undefined)
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    new UsersService().GetRoles().then((data) => {
      if (data.IsAuthenticated === false) {
        setLoading(false)
        return setIsAuthenticated(false)
      }
      if (data.roles.includes('ADMIN')) {
        setAdmin(true)
        setLoading(false)
      } else {
        setAdmin(false)
        setLoading(false)
      }
    })
  }, [])
  if (IsAuthenticated === false) {
    return <Navigate to="/" replace />
  }
  if (isLoading === true) {
    return <LoadingMain />
  }
  if (IsAdmin === true) {
    return <>{<Outlet />}</>
  } else {
    return <Navigate to="/users" replace />
  }
}
export default AdminRoute
