import React, { Component } from 'react'
import { connect } from 'react-redux'

const connector = connect(({ userProfile }) => ({
  userProfile
}))

const AboutPage = ({
  userProfile: {
    loaded
  }
}) => (
  <div>
    <p>AboutPage</p>
    <p>Loaded? {Boolean(loaded).toString()}</p>
    <p>Because sometimes you need things to be about something.</p>
  </div>
)

export default connector(AboutPage)
