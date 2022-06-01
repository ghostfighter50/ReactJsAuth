import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import UsersService from '../services/users.service'

const BanRoute:any = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [IsBanned, setBanned] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    new UsersService().GetRoles().then(data => {
      if (data.roles.includes('BANNED')) {
        setBanned(true)
        setLoading(false)
      } else {
        setBanned(false)
        setLoading(false)
      }
    })
  }, [])
  if (isLoading) {
    return <div className='display-1 text-center text-white'>Loading...</div>
  }
  if (IsBanned === true) {
    return <>{<Outlet/>}</>
  }
}
export default BanRoute
