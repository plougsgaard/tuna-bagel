// these are required for the async/await nonsense
require('babel-core/register')
require('babel-polyfill')

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Router from './router'
import store from './redux/store'
import { NODE_ENV } from './config'

ReactDOM.render((
  <Provider store={store}>
    {
      (NODE_ENV !== 'production')
        ? (
          <div>
            <Router store={store}/>
            {React.createElement(require('./redux/DevTools'))}
          </div>
        )
        : (
          <Router store={store}/>
        )
    }
  </Provider>
), document.getElementById('app'))
