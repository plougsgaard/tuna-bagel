import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import lifecycle from '../../helpers/lifecycle'
import Transition from 'react-motion-ui-pack'

import {
  loadUserProfile,
  handleSaveUserProfile
} from '../../redux/actions/userProfile'

import Header from './Header'
import EditProfile from './EditProfile'

const AlertBox = ({ show = false }) => {
  return (
    <Transition
      component={false}
      enter={{
        opacity: 1,
        scale: 1
      }}
      leave={{
        opacity: 0,
        scale: 1.05
      }}
    >
      {
        show &&
        <div key='foo' style={{background: '#F1F2F3', width: '400px'}}>
          Hi there.
        </div>
      }
    </Transition>
  )
}

const ProfilePage = ({ userProfile }) => {
  const { entry, errorLoad } = userProfile
  return (
    <div>
      <Header />
      <div className='row'>
        <div className='col-md-6'>
          <div className='page-header'>
            <h3>Change your profile</h3>
          </div>
          <EditProfile
            onSubmit={handleSaveUserProfile}
            entry={entry} />
        </div>
        <div className='col-md-6'>
          <div className='page-header'>
            <h3>Other clickery</h3>
            <AlertBox show={Boolean(errorLoad)} />
            <p>Click me</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  connect(({ userProfile }) => ({ userProfile })),
  lifecycle({
    enter: (d) => d(loadUserProfile())
  })
)(ProfilePage)
