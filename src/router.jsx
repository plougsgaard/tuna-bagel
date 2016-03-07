import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { PrivateContainer, PublicContainer, redirectAuthed, redirectUnauthed } from './components/containers'

import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import AboutPage from './pages/about'
import HomePage from './pages/home'

const RootRouter = ({ store }) => (
  <Router history={browserHistory}>
    <Route path='' component={PublicContainer}>
      <Route path='/landing' component={LandingPage} />
      <Route path='/login' component={LoginPage} onEnter={redirectAuthed(store)} />
    </Route>
    <Route path='/' component={PrivateContainer} onEnter={redirectUnauthed(store)}>
      <IndexRoute component={HomePage} />
      <Route path='/about' component={AboutPage} />
    </Route>
  </Router>
)

export default RootRouter
