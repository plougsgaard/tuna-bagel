import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { Provider } from 'react-redux'
import store from './redux/store'

import LandingPage from './pages/landing'
import LoginPage from './pages/login'
import AboutPage from './pages/about'

import { MenuLink } from './components/links'

class App extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    const { children } = this.props
    return (
      <div className='row'>
        <ul className='menu'>
          <MenuLink to='/' onlyActiveOnIndex>Home</MenuLink>
          <MenuLink to='/login'>Login</MenuLink>
          <MenuLink to='/About'>About</MenuLink>
        </ul>
        {children}
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/about" component={AboutPage}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
