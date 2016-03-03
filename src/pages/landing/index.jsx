import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

class LandingPage extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h1>Welcome to the thing</h1>
        <h3>Good things are bound to ensue</h3>
      </div>
    )
  }
}

export default connectToStore(LandingPage)
