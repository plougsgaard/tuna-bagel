import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import LoginPage from './pages/login/Login'

class App extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    return (
      <div className='content'>
        <LoginPage />
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
