import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

import { loadUserProfile } from '../../redux/reducers/userProfile'

class LoginPage extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount = () => {
    this.props.dispatch(loadUserProfile('foobar'))
  }
  static mapState = ({ posts, userProfile }) => ({ posts, userProfile })
  render () {
    return (
      <div>
        Crazy Login Form
      </div>
    )
  }
}

export default connectToStore(LoginPage)
