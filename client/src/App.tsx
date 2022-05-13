import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Main from './components/Dashboard/Main';
import Userdetail from './components/Dashboard/Userdetail';
export default class App extends Component {
  render() {
    return (
      <Router>
          <Routes>
            <Route  path='/' element={<Home/>} />
            <Route  path='/dashboard' element={<Main/>} />
            <Route  path='/user/:userId' element={<Userdetail/>} />
          </Routes>
      </Router>
    );
  }
}