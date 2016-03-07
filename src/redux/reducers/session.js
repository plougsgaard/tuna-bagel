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
  action: CLEAR
})

const loginSession = async ({ email, password }) => {
  await sleep(50)
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
 * Pattern for `redux-form` handlers. Example for login.
 * Make an http request. If it goes bad it will leak a rejected promise with
 * the `_error` field set. The form picks up on this and cancels the ordeal.
 */
export const handleSubmitLogin = async (values, dispatch) => {
  const ls = await loginSession(values)
  return dispatch(setSession(ls))
}
