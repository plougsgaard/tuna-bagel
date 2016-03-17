import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import connectToStore from '../../redux/connectToStore'
import moment from 'moment'

import { handleSubmitResetRequest, handleSubmitResetConfirm, handleRetry } from '../../redux/reducers/resetPassword'

import ResetRequestForm from './ResetRequest'
import ResetConfirmForm from './ResetConfirm'

class ForgotPage extends Component {
  constructor (props) {
    super(props)
  }
  static contextTypes = { router: PropTypes.object }
  render () {
    const { dispatch, resetPassword, params: { token } } = this.props
    const { requestTimestamp, didReset } = resetPassword

    if (token) {
      if (didReset) {
        return (
          <div>
            <div className='jumbotron'>
              <h1>Fantastic!</h1>
              <p>Your password has been reset!</p>
              <p><Link to='/login'>You may now log in</Link></p>
            </div>
          </div>
        )
      }
      return (
        <div>
          <div className='jumbotron'>
            <h1>Reset password</h1>
            <p>To prevent abuse we have to ask for your email too.</p>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <ResetConfirmForm onSubmit={handleSubmitResetConfirm(token)} />
            </div>
          </div>
        </div>
      )
    }

    const timestamp = requestTimestamp && moment(requestTimestamp, 'X').format('ddd, hA')
    if (timestamp) {
      return (
        <div>
          <div className='jumbotron'>
            <h1>Jolly good!</h1>
            <p>We've sent you an email around {timestamp}. It contains a link for resetting your password.</p>
            <p style={{ color: 'lightgray' }}>Note also that this is no guarantee the email actually exists in the database. We are sneaky that way.</p>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='jumbotron'>
          <h1>Forgot password?</h1>
          <p>Just type in your email and we'll send a reset link.</p>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <ResetRequestForm onSubmit={handleSubmitResetRequest}/>
          </div>
          <div className='col-lg-6'>
            <blockquote className='blockquote-reverse'>
              <p>And then I <Link to='/login'>remembered it</Link> in another dream.</p>
              <small>Hubert J. Farnsworth of <cite>Planet Express</cite></small>
            </blockquote>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ resetPassword }) => ({ resetPassword })
export default connect(mapState)(ForgotPage)
