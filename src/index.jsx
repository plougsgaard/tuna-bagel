require('babel-core/register');
require('babel-polyfill');

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Router from './router'

import { Provider } from 'react-redux'
import store from './redux/store'

import { NODE_ENV } from './config'

import { TopBar } from './components/menus'

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router store={store}/>
      {NODE_ENV !== 'production' && React.createElement(require('./redux/DevTools'))}
    </div>
  </Provider>
), document.getElementById('app'))
