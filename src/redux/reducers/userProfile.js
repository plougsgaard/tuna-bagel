import { mergeReducers, loadEntryReducer, updateEntriesReducer } from './util'
import {
  LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
  UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE
} from '../actions/userProfile'

const userProfileReducer = (state = {}, action = {}) => {
  const { type } = action
  switch (type) {
    default:
      return state
  }
}

export default mergeReducers(
  userProfileReducer,
  loadEntryReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ]),
  updateEntriesReducer([ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ])
)
