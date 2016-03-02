import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

class AboutPage extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        Because sometimes sites need an about page to make it seem there is content.
      </div>
    )
  }
}

export default connectToStore(AboutPage)
