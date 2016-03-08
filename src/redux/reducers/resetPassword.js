import { httpRequest } from '../../network'
import moment from 'moment'

import { makeDigest } from './session'

///////////////////////////////////////////////////////////////////////////////
// Action Creators ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const RESET_REQUEST = 'tuna-bagel/resetPassword/RESET_REQUEST'
const RESET_CONFIRM = 'tuna-bagel/resetPassword/RESET_CONFIRM'
const RESET_CLEAR = 'tuna-bagel/resetPassword/RESET_CLEAR'

export const resetRequest = () => ({ type: RESET_REQUEST })
export const resetConfirm = () => ({ type: RESET_CONFIRM })
export const resetClear = () => ({ type: RESET_CLEAR })

///////////////////////////////////////////////////////////////////////////////
// Reducer ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = {
  requestTimestamp: null,
  didReset: false
}

export default function resetPasswordReducer (state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case RESET_REQUEST:
      return {
        ...state,
        requestTimestamp: moment().unix()
      }
    case RESET_CONFIRM:
      return {
        ...state,
        didReset: true
      }
    case RESET_CLEAR:
      return initialState
    default:
      return state
  }
}

///////////////////////////////////////////////////////////////////////////////
// Controllers ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const httpResetRequest = async ({ email }) => {
  const url = 'auth/reset'
  const options = {
    method: 'post',
    body: {
      email
    }
  }
  return await httpRequest(url, options)
}

const httpResetConfirm = async ({ digest, token }) => {
  const url = 'auth/reset/confirm'
  const options = {
    method: 'post',
    body: {
      digest,
      token
    }
  }
  return await httpRequest(url, options)
}

export const handleSubmitResetRequest = async (values, dispatch) => {
  // initiate reset request and wait for the answer
  const response = await httpResetRequest(values)
  // if we got here it means an error wasn't thrown
  dispatch(resetRequest())
}

export const handleRetry = (dispatch) => (e) => {
  dispatch(resetClear())
}

export const handleSubmitResetConfirm = (token) => async ({ email, password }, dispatch) => {
  const digest = makeDigest({ email, password })
  const response = await httpResetConfirm({ digest, token })
  dispatch(resetConfirm())
}
