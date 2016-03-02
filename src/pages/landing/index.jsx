import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

class LandingPage extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        Landing page
      </div>
    )
  }
}

export default connectToStore(LandingPage)
