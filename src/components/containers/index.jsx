import React, { Component } from 'react'

import { clearSession } from '../../redux/reducers/session'

import { TopBar } from '../menus'

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

export class PrivateContainer extends Component {
  constructor (props) {
    super(props)
  }
  render = () => {
    const { children } = this.props
    return (
      <div>
        <div className='row'>
          <TopBar />
        </div>
        <div className='row' style={{ padding: '1.5em' }}>
          {children}
        </div>
      </div>
    )
  }
}

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
