import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadUserProfile } from '../../redux/reducers/userProfile'

const connector = connect(({ userProfile }) => ({
  userProfile
}))

class ProfilePage extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    console.log('componentWillMount')
    this.props.dispatch(loadUserProfile())
  }
  render () {
    const { userProfile } = this.props
    console.log(userProfile)
    return (
      <div>
        <h1>User Profile Page</h1>
        <Link to='/logout'>Sign out</Link>
      </div>
    )
  }
}

export default connector(ProfilePage)
