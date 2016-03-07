import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

class HomePage extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h1>This is the root</h1>
      </div>
    )
  }
}

export default connectToStore(HomePage)
