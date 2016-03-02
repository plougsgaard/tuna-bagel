import { getRequest } from '../../network'

const LOAD = 'tuna-bagel/userProfile/LOAD'
const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
const LOAD_FAIL = 'tuna-bagel/userProfile/LOAD_FAIL'

const initialState = {
  loaded: false
}

const userProfile = (state = initialState, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: payload
      }
    default:
      return state
  }
}

export default userProfile

export const loadUserProfileSuccess = (userProfile) => ({
  type: LOAD_SUCCESS,
  payload: userProfile
})

export const loadUserProfileFail = (reason) => ({
  type: LOAD_FAIL,
  payload: reason
})

export const loadUserProfile = (token) => ({
  type: LOAD,
  payload: getRequest({
    url: 'http://www.mocky.io/v2/56cc2f48280000c100219da3',
    //url: 'http://www.mocky.io/v2/56cc266e280000c100219d9a',
    success: loadUserProfileSuccess,
    fail: loadUserProfileFail
  })
})

/*
const loadUserProfileFromServer = (token) =>
  new Promise((resolve, reject) => {
    fetch('http://www.mocky.io/v2/56cc266e280000c100219d9a').then(
      (cnt) => resolve(loadUserProfileSuccess(cnt.json())),
      (err) => reject(loadUserProfileFail(err))
    )
  })

export const loadUserProfile = (token) => ({
  type: LOAD,
  payload: loadUserProfileFromServer(token)
})*/
