import { LOAD_ONE } from '../middleware/apiLoad'

export const LOAD_REQUEST = 'tuna-bagel/userProfile/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/userProfile/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/userProfile/LOAD_FAILURE'

export const loadUserProfile = () => ({
  api: LOAD_ONE,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: `/users/profile`
})
