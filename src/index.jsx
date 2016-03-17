// these are required for the async/await nonsense
require('babel-core/register')
require('babel-polyfill')

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Router from './router'
import configureStore from './redux/store'
import { NODE_ENV } from './config'

const store = configureStore({})

ReactDOM.render((
  <Provider store={store}>
    <Router store={store}/>
  </Provider>
), document.getElementById('app'))
