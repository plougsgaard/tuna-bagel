import { httpRequest } from '../../network'

///////////////////////////////////////////////////////////////////////////////
// Action Creators ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const LOAD = 'tuna-bagel/userProfile/LOAD'
const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
const LOAD_FAIL = 'tuna-bagel/userProfile/LOAD_FAIL'

///////////////////////////////////////////////////////////////////////////////
// Reducer ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = {
  loaded: false
}

export default function userProfileReducer (state = initialState, action = {}) {
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
