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
    users:Array<any>
}

function Result (props:UsersList) {
  console.log(props.users)
  let i = 0
  if (props.users === [] && !Array.isArray(props.users)) {
    return (
            <tr>
              <td><h1>No users</h1></td>
            </tr>
    )
  } else {
    return (
    <>
        {props.users.map((user) => {
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
      users: []
    }
  }

  componentDidMount () {
    axios.get(`${process.env.API_URL || 'http:///localhost'}:${process.env.API_PORT || 8000}/api/users/`).then(res => {
      console.log(res.data)
      this.setState({ users: res.data })
    })
  }

  render () {
    console.log(this.state.users)
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
            {this.state.users && <Result users = {this.state.users} />}
            </tbody>
            </table>
            <Nav/>
            </div>
    )
  }
}

export default Users
