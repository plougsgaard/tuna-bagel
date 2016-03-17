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
    const { children, dispatch, layout } = this.props
    return (
      <div>
        <TopBar
          collapsed={layout.navbarCollapsed}
          toggleCollapse={() => dispatch(navbarToggleCollapse())} />
        <div className='container'>
          {children}
        </div>
      </div>
    )
  }
}
const privateConnector = connect(({ layout }) => ({
  layout
}))
export const PrivateContainer = privateConnector(PrivateContainerBase)


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
      <div className='row'>
        <div className='row'>
          Just public stuff..
        </div>
        <div className='row' style={{ paddingTop: '1.5em' }}>
          {children}
        </div>
      </div>
    )
  }
}
