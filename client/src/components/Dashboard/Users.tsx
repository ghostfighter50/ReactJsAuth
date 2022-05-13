/* eslint-disable react/jsx-key */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from './Nav'

interface UserInfo{
    Name?: string,
    email?: string,
    password?:string,
    _id?: string
}

interface UsersList {
    Users:Array<UserInfo>
}

function Result (props:UsersList) {
  let i = 0
  if (!props.Users || !Array.isArray(props.Users)) {
    return (
            <tr>
              <td><h1>No Users</h1></td>
            </tr>
    )
  } else {
    return (
    <>
        {props.Users.map((user) => {
          return (
    <tr>
      <th scope="row">{i++}</th>
      <td>{user.Name}</td>
      <td><Link className='btn btn-success' to={'/user/' + user._id}>More Details</Link></td>
    </tr>
          )
        })
    }
    </>
    )
  }
}

class Users extends Component<UserInfo, UsersList> {
  constructor (props:UserInfo) {
    super(props)
    this.state = {
      Users: []
    }
  }

  componentDidMount () {
    axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/Users/`).then(Users => {
      this.setState({ Users: Users.data })
    })
  }

  render () {
    return (
            <div className='jumbotron table-responsive'>
            <table className="table ">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Details</th>
            </tr>
            </thead>
            <tbody>
            {this.state.Users && <Result Users = {this.state.Users} />}
            </tbody>
            </table>
            <Nav/>
            </div>
    )
  }
}

export default Users
