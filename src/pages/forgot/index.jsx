import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import connectToStore from '../../redux/connectToStore'
import moment from 'moment'

import { handleSubmitResetRequest, handleSubmitResetConfirm, handleRetry } from '../../redux/reducers/resetPassword'

import { AlertSuccess } from '../../components/alerts'
import ResetRequestForm from '../../components/forms/ResetRequest'
import ResetConfirmForm from '../../components/forms/ResetConfirm'

class ForgotPage extends Component {
  constructor (props) {
    super(props)
  }
  static contextTypes = { router: PropTypes.object }
  static mapState = ({ resetPassword }) => ({ resetPassword })
  render () {
    const { dispatch, resetPassword, params: { token } } = this.props
    const { requestTimestamp, didReset } = resetPassword

    if (token) {
      if (didReset) {
        return (
          <div>
            <AlertSuccess>
              <p>Your password has been reset!</p>
              <p><Link to='/login'>You may now log in</Link></p>
            </AlertSuccess>
            <p style={{ color: 'gray' }}>Good luck.</p>
          </div>
        )
      }
      return (
        <ResetConfirmForm onSubmit={handleSubmitResetConfirm(token)} />
      )
    }

    const timestamp = requestTimestamp && moment(requestTimestamp, 'X').format('ddd, hA')
    if (timestamp) {
      return (
        <div>
          <AlertSuccess>We've sent you an email on circa {timestamp}. It contains a link for resetting your password.</AlertSuccess>
          <p>If you didn't get an email yet or are just very impatient you may retry by clicking below.</p>
          <button type='submit' className='button' onClick={handleRetry(dispatch)}>Let's retry</button>
          <p style={{ color: 'gray' }}>Note also that this is no guarantee the email actually exists in the database. We are sneaky that way.</p>
        </div>
      )
    }
    return (
      <ResetRequestForm onSubmit={handleSubmitResetRequest}/>
    )
  }
}

export default connectToStore(ForgotPage)
