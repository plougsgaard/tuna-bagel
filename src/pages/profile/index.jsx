import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import lifecycle from '../../helpers/lifecycle'

import {
  loadUserProfile,
  handleSaveUserProfile
} from '../../redux/actions/userProfile'

import Header from './Header'
import EditProfile from './EditProfile'

const ProfilePage = ({ userProfile }) => {
  const { entry } = userProfile
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
