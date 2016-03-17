import { browserHistory } from 'react-router'
import LocalStorage from 'store'
import { httpRequest } from '../../network'
import sha256 from 'crypto-js/sha256'

///////////////////////////////////////////////////////////////////////////////
// Action Creators ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const SET = 'tuna-bagel/session/SET'
const CLEAR = 'tuna-bagel/session/CLEAR'

export const setSession = (token) => ({ type: SET, payload: token })
export const clearSession = () => ({ type: CLEAR })

///////////////////////////////////////////////////////////////////////////////
// Reducer ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = {
  token: LocalStorage.get('token')
}

export default function sessionReducer (state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case SET:
      const { token } = payload
      LocalStorage.set('token', token)
      return { token }
    case CLEAR:
      LocalStorage.clear()
      return { token: null }
    default:
      return state
  }
}

///////////////////////////////////////////////////////////////////////////////
// Controllers ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const makeDigest = ({ email, password }) =>
  sha256(`${email}${password}`).toString()

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const httpLogin = async ({ email, password }) => {
  await sleep(500)
  const digest = makeDigest({ email, password })
  const url = 'auth/login'
  const options = {
    method: 'post',
    body: {
      email,
      digest
    }
  }
  return await httpRequest(url, options)
}

/**
 * Login handler. Used by `redux-form` form.
 */
export const handleSubmitLogin = (nextPath = '/') =>
  async (values, dispatch) => {
    // get token from server - or fail, leaking a rejected promise
    const token = await httpLogin(values)
    // if we get here it means we didn't fail. dispatch a SET action
    dispatch(setSession(token))
    // TODO potential race condition - would wait for store to update if there was a way
    browserHistory.push(nextPath)
  }
