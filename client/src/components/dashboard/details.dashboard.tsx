import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UsersService from './../../services/users.service'
import { IUserDashboard } from './../../interfaces/dashboard.interfaces'

function Detail (props: IUserDashboard) {
  return (
    <div className="card">
      <div className="card-header">Details</div>
      <div className="card-body">
        <h5 className="card-title">
          {' '}
          <b>Name: </b> {props.name}
        </h5>
        <p className="card-text">
          <b>Email: </b> {props.email}
        </p>
        <a className="btn btn-warning" href="/users">
          Go Back{' '}
        </a>
      </div>
    </div>
  )
}

export default function DashboardDetails () {
  const [UserInformations, setUserInformations] = useState<any>(null)
  const { userId } = useParams()
  useEffect(() => {
    new UsersService().FetchUser(userId).then((data) => {
      setUserInformations(data)
    })
  }, [userId])
  return <div>{UserInformations && <Detail {...UserInformations} />}</div>
}
