import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import UsersService from './../../services/users.service'

interface IUser {
    name:string,
    email:string,
    userId:string,
}

function Detail (props:IUser) {
  return (
         <div className="card">
                <div className="card-header">
                    Details
                </div>
                <div className="card-body">
                    <h5 className="card-title"> <b>Name: </b> {props.name}</h5>
                    <p className="card-text"><b>Email: </b>  {props.email}</p>
                    <a className="btn btn-warning" href='/dashboard'>Go Back </a>
                </div>
            </div>
  )
}

export default function DashboardDetails () {
  const [UserInformations, setUserInformations] = useState<any>(null)
  const { userId } = useParams()
  useEffect(() => {
    new UsersService().FetchUser(userId).then(data => {
      setUserInformations(data)
    })
  }, [userId])
  const renderCounter = useRef(0)
  renderCounter.current = renderCounter.current + 1
  return (
            <div>
            <h1>Renders: {renderCounter.current}</h1>
            {UserInformations && <Detail {...UserInformations} />}
            </div>
  )
}
