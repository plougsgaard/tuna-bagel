import React from 'react'
import _ from 'lodash'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'

const lifecycle = ({ enter, leave }) => BaseComponent => (
  class Lifecycle extends React.Component {

    componentWillMount() {
      if (enter) {
        enter(_.get(this, 'props.dispatch'), this)
      }
    }

    componentWillUnmount() {
      if (leave) {
        leave(_.get(this, 'props.dispatch'), this)
      }
    }

    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ...this.state
      })
    }
  }
)

export default createHelper(lifecycle, 'lifecycle')
