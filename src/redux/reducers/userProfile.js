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
  payload: `Let's implement this at another time.`
})

