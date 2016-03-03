import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

import { handleSubmitLogin } from '../../redux/reducers/session'

import LoginForm from '../../components/forms/Login'

class LoginPage extends Component {
  constructor (props) {
    super(props)
  }
  static mapState = ({ session }) => ({ session })
  render () {
    return (
      <div>
        <LoginForm onSubmit={handleSubmitLogin}/>
      </div>
    )
  }
}

export default connectToStore(LoginPage)
