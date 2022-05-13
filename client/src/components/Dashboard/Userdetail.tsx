import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

axios.defaults.withCredentials = true

type UserState = {
    UserInformations:any
}
interface IUser {
    Name:string,
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
                    <h5 className="card-title"> <b>Name: </b> {props.Name}</h5>
                    <p className="card-text"><b>Email: </b>  {props.email}</p>
                    <Link className="btn btn-warning" to='/dashboard'>Go Back </Link>
                </div>
            </div>
  )
}

class Userdetail extends Component<{}, UserState> {
  constructor (props:any) {
    super(props)
    const { userId } = useParams()
    const data = async () => {
      await axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/users/` + userId)
    }
    this.state = {
      UserInformations: data.toString()
    }
  }

  render () {
    return (
            <div>
            {this.state.UserInformations && <Detail {...this.state.UserInformations} />}
            </div>
    )
  }
}

export default Userdetail
