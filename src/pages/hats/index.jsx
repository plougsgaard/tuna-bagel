import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadHats, foobar } from '../../redux/actions/hats'

const connector = connect(({ hats }) => ({
  hats
}))

class HatsPage extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    console.log('HatsPage:componentWillMount')
    this.props.dispatch(loadHats())
    this.props.dispatch(foobar())
  }
  render () {
    const { hats } = this.props
    const { body } = hats
    console.log(hats)
    return (
      <div>
        <h1>Hats</h1>
        <p>Loading: {Boolean(hats.loading).toString()}</p>
      </div>
    )
  }
}

export default connector(HatsPage)
