import _ from 'lodash'
import { httpRequest } from '../../network'

///////////////////////////////////////////////////////////////////////////////
// Action Creators ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const LOAD_REQUEST = 'tuna-bagel/userProfile/LOAD_REQUEST'
const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
const LOAD_FAILURE = 'tuna-bagel/userProfile/LOAD_FAILURE'

///////////////////////////////////////////////////////////////////////////////
// Reducer ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = {
  requestCount: 0,
  loading: false,
  error: null,
  body: {},
  lastFetched: null
}

export default function userProfileReducer (state = initialState, action = {}) {
  const { requestCount } = state
  const { type, body, error, lastFetched } = action
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
        lastFetched
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
  // Types of actions to emit before and after
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],

  shouldCallAPI: (state) => state.posts.data.length === 0 && !state.posts.isLoading,

  // Perform the fetching:
  callAPI: () => httpRequest('user/profile'),

  // Arguments to inject in begin/end actions
  payload: {}
})
