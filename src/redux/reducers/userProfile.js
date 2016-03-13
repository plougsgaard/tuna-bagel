import _ from 'lodash'
import { httpRequest } from '../../network'
import { callWhenExpired } from '../middleware/apiMiddleware'

///////////////////////////////////////////////////////////////////////////////
// Action Creators ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const LOAD_REQUEST = 'tuna-bagel/userProfile/LOAD_REQUEST'
const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
const LOAD_FAILURE = 'tuna-bagel/userProfile/LOAD_FAILURE'

///////////////////////////////////////////////////////////////////////////////
// Reducer ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const MOUNT_POINT = 'userProfile'

const initialState = {
  requestCount: 0,
  loading: false,
  error: null,
  body: {},
  lastUpdated: null
}

export default function userProfileReducer (state = initialState, action = {}) {
  const { requestCount } = state
  const { type, body, error, lastUpdated } = action
  switch (type) {
    case LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        requestCount: (requestCount + 1)
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        body,
        lastUpdated
      }
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error
      }
    default:
      return state
  }
}

///////////////////////////////////////////////////////////////////////////////
// Controllers ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const loadUserProfile = () => ({
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],
  shouldCallAPI: callWhenExpired(MOUNT_POINT),
  callAPI: httpRequest('auth/login', { method: 'post' })
})
