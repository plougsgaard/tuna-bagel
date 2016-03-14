import { combineReducers } from 'redux'
import { reduceReducers, mergeReducers, loadEntriesReducer, addEntriesReducer } from './util'
import {
  LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
  ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE
} from '../actions/hats'

const hatsReducer = (state = {}, action = {}) => {
  const { type } = action
  switch (type) {
    default:
      return state
  }
}

export default mergeReducers(
  hatsReducer,
  loadEntriesReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ]),
  addEntriesReducer([ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ])
)
