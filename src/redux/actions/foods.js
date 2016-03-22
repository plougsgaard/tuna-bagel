import uuid from 'uuid'

import { ADD_ONE } from '../middleware/apiAdd'
import { LOAD_MANY } from '../middleware/apiLoad'
import { UPDATE_ONE } from '../middleware/apiUpdate'

export const LOAD_REQUEST = 'tuna-bagel/food/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/food/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/food/LOAD_FAILURE'

export const ADD_REQUEST = 'tuna-bagel/food/ADD_REQUEST'
export const ADD_SUCCESS = 'tuna-bagel/food/ADD_SUCCESS'
export const ADD_FAILURE = 'tuna-bagel/food/ADD_FAILURE'

export const UPDATE_REQUEST = 'tuna-bagel/food/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'tuna-bagel/food/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'tuna-bagel/food/UPDATE_FAILURE'

export const EDIT_MARK = 'tuna-bagel/food/EDIT_MARK'
export const EDIT_UNMARK = 'tuna-bagel/food/EDIT_UNMARK'

export const editMarkFood = (id) => ({
  type: EDIT_MARK,
  id
})

export const editUnmarkFood = (id) => ({
  type: EDIT_UNMARK,
  id
})

export const loadFoods = () => ({
  api: LOAD_MANY,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/foods'
})

export const addFood = (payload) => {
  return {
    api: ADD_ONE,
    types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    path: '/foods',
    payload
  }
}

export const handleAddFood = async (values, dispatch) => dispatch(addFood(values))

export const handleSaveFood = (id) =>
  async (values, dispatch) => dispatch({
    api: UPDATE_ONE,
    types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    path: `/foods/${id}`,
    payload: {
      ...values,
      id
    }
  })
