import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import AboutPage from './pages/about'

const RootRouter = ({ root }) => (
  <Router history={browserHistory}>
    <Route path="/" component={root}>
      <IndexRoute component={LandingPage} />
      <Route path="/login" component={LoginPage}/>
      <Route path="/about" component={AboutPage}/>
    </Route>
  </Router>
)

export default RootRouter
