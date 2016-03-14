import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadUserProfile } from '../../redux/actions/userProfile'

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
    const { entry } = userProfile
    return (
      <div>
        <h1>User Profile Page</h1>
        <p>Name: {entry.name}</p>
        <p>Role: {entry.role}</p>
        <Link to='/logout'>Sign out</Link>
      </div>
    )
  }
}

export default connector(ProfilePage)
