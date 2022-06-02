import React, { Component } from 'react'

export default class LoadingMain extends Component {
  render () {
    return (
        <div className="container">
        <div className="row">
          <div className="col text-center text-light">
            <div className="spinner-border" style={{ width: '100px', height: '100px' }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
