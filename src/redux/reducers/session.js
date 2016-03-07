import { browserHistory } from 'react-router'
import LocalStorage from 'store'
import { httpRequest } from '../../network'

import sha256 from 'crypto-js/sha256'

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const SET = 'tuna-bagel/session/SET'
const CLEAR = 'tuna-bagel/session/CLEAR'

const initialState = {
  token: LocalStorage.get('token')
}

const session = (state = initialState, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case SET:
      const { token } = payload
      LocalStorage.set('token', token)
      return { token }
    case CLEAR:
      LocalStorage.clear()
      return initialState
    default:
      return state
  }
}

export default session

const setSession = (token) => ({
  type: SET,
  payload: token
})

export const clearSession = () => ({
  type: CLEAR
})

const loginSession = async ({ email, password }) => {
  await sleep(500)
  const digest = sha256(`${email}${password}`).toString()
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
    const token = await loginSession(values)
    // if we get here it means we didn't fail. dispatch a SET action
    dispatch(setSession(token))
    // TODO potential race condition - would wait for store to update if there was a way
    browserHistory.push(nextPath)
  }
