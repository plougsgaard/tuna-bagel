import _ from 'lodash'
import { mergeReducers, loadEntriesReducer, addEntriesReducer } from './util'
import {
  LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
  ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE,
  EDIT_MARK, EDIT_UNMARK
} from '../actions/brands'

const brandsReducer = (state = {}, action = {}) => {
  const { type, id } = action
  switch (type) {
    default:
      return state
  }
}

export default mergeReducers(
  brandsReducer,
  loadEntriesReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ]),
  addEntriesReducer([ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ])
)
