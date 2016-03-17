import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import connectToStore from '../../redux/connectToStore'

import { handleSubmitLogin } from '../../redux/reducers/session'

import LoginForm from '../../components/forms/Login'

class LoginPage extends Component {
  constructor (props) {
    super(props)
  }
  static contextTypes = { router: PropTypes.object }
  render () {
    const nextPath = _.get(this.props, 'location.state.nextPathname')
    return (
      <div>
        <div className='jumbotron'>
          <h1>Sign in if you please</h1>
          <p>No it's a mistake, <Link to='/landing'>take me back</Link> to the landing page!</p>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <LoginForm onSubmit={handleSubmitLogin(nextPath)}/>
          </div>
          <div className='col-lg-6'>
            <blockquote className='blockquote-reverse'>
              <p>One does not simply <Link to='/forgot'>forget his password</Link>.</p>
              <small>Eddard Stark of <cite>Winterfell</cite></small>
            </blockquote>
          </div>
        </div>
      </div>
    )
  }
}

export default connectToStore(LoginPage)
