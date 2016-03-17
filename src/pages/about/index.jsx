import React, { Component } from 'react'
import { connect } from 'react-redux'

const AboutPage = ({
  userProfile: {
    loaded
  }
}) => (
  <div>
    <h1>About this project</h1>
    <p>Created by <a href='https://github.com/plougsgaard'>@plougsgaard</a>.</p>
  </div>
)

const mapState = ({ userProfile }) => ({ userProfile })
export default connect(mapState)(AboutPage)
