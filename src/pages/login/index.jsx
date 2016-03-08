import React, { Component, PropTypes } from 'react'
import connectToStore from '../../redux/connectToStore'

import { handleSubmitLogin } from '../../redux/reducers/session'

import LoginForm from '../../components/forms/Login'

class LoginPage extends Component {
  constructor (props) {
    super(props)
  }
  static contextTypes = { router: PropTypes.object }
  render () {
    const nextPath = _.get(this.props, 'location.state.nextPathname')
    return (
      <div>
        <LoginForm onSubmit={handleSubmitLogin(nextPath)}/>
      </div>
    )
  }
}

export default connectToStore(LoginPage)
