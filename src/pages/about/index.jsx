import React, { Component } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'

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
AboutPage.componentWillMount = () => {
  console.log('mehhh???')
}

export default connector(AboutPage)
