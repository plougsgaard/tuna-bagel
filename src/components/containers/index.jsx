import React, { Component } from 'react'
import { connect } from 'react-redux'

import { navbarToggleCollapse } from '../../redux/actions/layout'
import { clearSession } from '../../redux/reducers/session'

import { TopBar } from '../menus'

//
// Redirection rules
//

export const redirectLogout = (store) =>
  (nextState, replace) => {
    store.dispatch(clearSession())
    replace({
      pathname: '/landing'
    })
  }

export const redirectUnauthed = (store) =>
  (nextState, replace) => {
    const state = store.getState()
    if (state.session && state.session.token) {
      return
    }
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

export const redirectAuthed = (store) =>
  (nextState, replace) => {
    const state = store.getState()
    if (state.session && state.session.token) {
      replace({
        pathname: '/'
      })
    }
  }

//
// Private Container
//

class PrivateContainerBase extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    const { children, layout, navbarToggleCollapse } = this.props
    return (
      <div>
        <TopBar
          collapsed={layout.navbarCollapsed}
          toggleCollapse={navbarToggleCollapse} />
        <div className='container'>
          {children}
        </div>
      </div>
    )
  }
}
const mapState = ({ layout }) => ({ layout })
const mapActions = { navbarToggleCollapse }
export const PrivateContainer = connect(mapState, mapActions)(PrivateContainerBase)

//
// Public Container
//

export class PublicContainer extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    const { children } = this.props
    return (
      <div className='container'>
        {children}
      </div>
    )
  }
}
