import { LOAD_ONE, UPDATE_ONE } from '../middleware/api'

export const LOAD_REQUEST = 'tuna-bagel/userProfile/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/userProfile/LOAD_FAILURE'

export const UPDATE_REQUEST = 'tuna-bagel/userProfile/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'tuna-bagel/userProfile/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'tuna-bagel/userProfile/UPDATE_FAILURE'

export const loadUserProfile = () => ({
  api: LOAD_ONE,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: `/users/profile`
})

export const handleSaveUserProfile = async (values, dispatch) =>
  dispatch({
    api: UPDATE_ONE,
    types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    path: `/users/profile`,
    payload: values
  })
