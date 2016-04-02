import uuid from 'uuid'

import { ADD_ONE, LOAD_MANY, UPDATE_ONE } from '../middleware/api'

export const LOAD_REQUEST = 'tuna-bagel/hats/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/hats/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/hats/LOAD_FAILURE'

export const ADD_REQUEST = 'tuna-bagel/hats/ADD_REQUEST'
export const ADD_SUCCESS = 'tuna-bagel/hats/ADD_SUCCESS'
export const ADD_FAILURE = 'tuna-bagel/hats/ADD_FAILURE'

export const UPDATE_REQUEST = 'tuna-bagel/hats/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'tuna-bagel/hats/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'tuna-bagel/hats/UPDATE_FAILURE'

export const EDIT_MARK = 'tuna-bagel/hats/EDIT_MARK'
export const EDIT_UNMARK = 'tuna-bagel/hats/EDIT_UNMARK'

export const editMarkHat = (id) => ({
  type: EDIT_MARK,
  id
})

export const editUnmarkHat = (id) => ({
  type: EDIT_UNMARK,
  id
})

export const loadHats = () => ({
  api: LOAD_MANY,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/hats'
})

export const addHat = (name) => {
  const id = uuid.v4()
  const payload = {
    name,
    id
  }
  return {
    api: ADD_ONE,
    types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    path: '/hats',
    payload
  }
}

export const handleSaveHat = (id) =>
  async (values, dispatch) => dispatch({
    api: UPDATE_ONE,
    types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    path: `/hats/${id}`,
    payload: {
      ...values,
      id
    }
  })
