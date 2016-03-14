import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import { loadHats, addHat } from '../../redux/actions/hats'

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
  }
  render () {
    const { hats } = this.props
    const { body } = hats
    return (
      <div>
        <h1>Hats</h1>
        <p>Loading: {Boolean(hats.loading).toString()}</p>
        {_.map(hats.entries, (h) => (
          <p key={h.id}>{h.id} - {h.name}</p>
        ))}
        <button onClick={() => this.props.dispatch(addHat('Saq'))}>Add another hat why not</button>
      </div>
    )
  }
}

export default connector(HatsPage)
