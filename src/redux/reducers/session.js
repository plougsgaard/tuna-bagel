import { _getRequest } from '../../network'

import sha256 from 'crypto-js/sha256'

const LOGIN = 'tuna-bagel/session/LOGIN'
const LOGIN_SUCCESS = 'tuna-bagel/session/LOGIN_SUCCESS'
const LOGIN_FAIL = 'tuna-bagel/session/LOGIN_FAIL'
const CLEAR = 'tuna-bagel/session/CLEAR'

const initialState = {
  token: null,
  loading: false,
  failed: false
}

const session = (state = initialState, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        token: payload.token,
        loading: false,
        failed: false
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        failed: true
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}

export default session

const loginSessionSuccess = (response) => ({
  type: LOGIN_SUCCESS,
  payload: response
})

const loginSessionFail = (response) => ({
  type: LOGIN_FAIL,
  payload: response
})

const loginSession = ({ email, password }) => {
  const digest = sha256(`${email}${password}`).toString()
  const url = 'auth/login'
  const options = {
    method: 'post',
    body: {
      email,
      digest
    }
  }
  return {
    type: LOGIN,
    payload: _getRequest(url, options).then(loginSessionSuccess, loginSessionFail)
  }
}

export const handleSubmitLogin = (values, dispatch) => {
  // in this project `dispatch` returns a Promise which is very convenient
  // since it allows us to both fire a cool action *and* have redux-form
  // be informed of the outcome
  return dispatch(loginSession(values))
}

export const clearSession = () => ({
  action: CLEAR
})
