import uuid from 'uuid'

import {
  ADD_ONE, LOAD_MANY, UPDATE_ONE, DELETE_ONE,
  callWhenExpired
} from '../middleware/api'

const MOUNT_POINT = 'foods'

//
// api
//

export const LOAD_REQUEST = 'tuna-bagel/food/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/food/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/food/LOAD_FAILURE'

export const ADD_REQUEST = 'tuna-bagel/food/ADD_REQUEST'
export const ADD_SUCCESS = 'tuna-bagel/food/ADD_SUCCESS'
export const ADD_FAILURE = 'tuna-bagel/food/ADD_FAILURE'

export const UPDATE_REQUEST = 'tuna-bagel/food/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'tuna-bagel/food/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'tuna-bagel/food/UPDATE_FAILURE'

export const DELETE_REQUEST = 'tuna-bagel/food/DELETE_REQUEST'
export const DELETE_SUCCESS = 'tuna-bagel/food/DELETE_SUCCESS'
export const DELETE_FAILURE = 'tuna-bagel/food/DELETE_FAILURE'

//
// transient state
//

export const SHOW_ADD_FORM = 'tuna-bagel/food/SHOW_ADD_FORM'
export const HIDE_ADD_FORM = 'tuna-bagel/food/HIDE_ADD_FORM'

export const RESET_TRANSIENT_STATE = 'tuna-bagel/food/RESET_TRANSIENT_STATE'

//
// transient action creators
//

export const showAddForm = () => ({
  type: SHOW_ADD_FORM
})

export const hideAddForm = () => ({
  type: HIDE_ADD_FORM
})

export const resetTransientState = () => ({
  type: RESET_TRANSIENT_STATE
})

//
// api action creators
//

export const loadFoods = () => ({
  api: LOAD_MANY,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/foods',
  shouldCall: callWhenExpired(MOUNT_POINT)
})

export const addFood = (payload) => {
  return {
    api: ADD_ONE,
    forwardErrors: true,
    types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    path: '/foods',
    payload
  }
}

export const deleteFood = (id) => ({
  api: DELETE_ONE,
  types: [ DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE ],
  path: '/foods',
  payload: {
    id
  }
})

//
// form handlers
//

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
