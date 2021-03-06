import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingMain from '../components/loading/loading.main'
import UsersService from '../services/users.service'

const PublicRoute: any = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )
  useEffect(() => {
    new UsersService().GetSession().then((data) => {
      setIsAuthenticated(data.IsAuthenticated)
      setLoading(false)
    })
  }, [])
  if (isLoading === true) {
    return <LoadingMain />
  }
  if (IsAuthenticated === true) {
    return <Navigate to="/users" replace />
  } else {
    return <>{<Outlet />}</>
  }
}
export default PublicRoute
