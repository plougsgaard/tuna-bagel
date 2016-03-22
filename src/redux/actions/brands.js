import uuid from 'uuid'

import { ADD_ONE } from '../middleware/apiAdd'
import { LOAD_MANY } from '../middleware/apiLoad'
import { UPDATE_ONE } from '../middleware/apiUpdate'

export const LOAD_REQUEST = 'tuna-bagel/brands/LOAD_REQUEST'
export const LOAD_SUCCESS = 'tuna-bagel/brands/LOAD_SUCCESS'
export const LOAD_FAILURE = 'tuna-bagel/brands/LOAD_FAILURE'

export const ADD_REQUEST = 'tuna-bagel/brands/ADD_REQUEST'
export const ADD_SUCCESS = 'tuna-bagel/brands/ADD_SUCCESS'
export const ADD_FAILURE = 'tuna-bagel/brands/ADD_FAILURE'

export const loadBrands = () => ({
  api: LOAD_MANY,
  types: [ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ],
  path: '/brands'
})

export const addBrand = (name) => {
  const id = uuid.v4()
  const payload = {
    name,
    id
  }
  return {
    api: ADD_ONE,
    types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    path: '/brands',
    payload
  }
}