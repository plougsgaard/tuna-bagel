require('babel-core/register');
require('babel-polyfill');

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Router from './router'

import { Provider } from 'react-redux'
import store from './redux/store'

import { NODE_ENV } from './config'

import { TopBar } from './components/menus'

class App extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    const { children } = this.props
    return (
      <div className='row'>
        <div className='row'>
          <TopBar />
        </div>
        <div className='row' style={{ paddingTop: '1.5em' }}>
          {children}
        </div>
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router root={App}/>
      {NODE_ENV !== 'production' && React.createElement(require('./redux/DevTools'))}
    </div>
  </Provider>
), document.getElementById('app'))
