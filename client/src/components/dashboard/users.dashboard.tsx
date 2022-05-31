import React, { Component } from 'react'
import DashboardNav from './nav.dashboard'
import $ from 'jquery'
import UsersService from './../../services/users.service'

interface UserInfo{
    name?: string,
    email?: string,
    password?:string,
    _id?: string
}

interface UsersList {
    users:Array<any>
}

function DashboardTable (props:UsersList) {
  let i = 1
  if (props.users === null && !Array.isArray(props.users)) {
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
    <tr key={user.name}>
      <th scope="row">{i++}</th>
      <td>{user.name}</td>
      <td><a className='btn btn-success' href={'/user/' + user._id}>More Details</a></td>
    </tr>
          )
        })
    }
    </>
    )
  }
}

export default class DashboardUsers extends Component<UserInfo, UsersList> {
  constructor (props:UserInfo) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    $('.modal-backdrop').remove()
    new UsersService().FetchUsers().then(data => {
      this.setState({ users: data })
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
            {this.state.users && <DashboardTable users = {this.state.users} />}
            </tbody>
            </table>
            <DashboardNav/>
            </div>
    )
  }
}
