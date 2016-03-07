import React, { Component } from 'react'
import { Link } from 'react-router'
import connectToStore from '../../redux/connectToStore'

class ProfilePage extends Component {
  constructor (props) {
    super(props)
  }
  static mapState = ({ session }) => ({ session })
  render () {
    return (
      <div>
        <Link to='/logout'>Sign out</Link>
      </div>
    )
  }
}

export default connectToStore(ProfilePage)
