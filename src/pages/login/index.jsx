import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

import { loginSession } from '../../redux/reducers/session'

import { LoginForm } from '../../components/forms'

class LoginPage extends Component {
  constructor (props) {
    super(props)
  }
  static mapState = ({ session }) => ({ session })
  onSubmit = (e) => {
    e.preventDefault()
    const email = 'a@a.a'
    const password = 'secret'
    this.props.dispatch(loginSession({ email, password }))
  }
  render () {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default connectToStore(LoginPage)
