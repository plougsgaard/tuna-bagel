import _ from 'lodash'
import { mergeReducers, loadEntriesReducer, addEntriesReducer, updateEntriesReducer } from './util'
import {
  LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
  ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE,
  UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE,
  EDIT_MARK, EDIT_UNMARK
} from '../actions/hats'

const hatsReducer = (state = {
  editing: []
}, action = {}) => {
  const { type, id } = action
  switch (type) {
    case EDIT_MARK:
      const currentEntry = _.find(state.entries, { id })
      return {
        ...state,
        editing: _.unionBy(state.editing, [currentEntry], 'id')
      }
    case EDIT_UNMARK:
      const editingEntry = _.find(state.editing, { id })
      return {
        ...state,
        editing: _.without(state.editing, editingEntry)
      }
    default:
      return state
  }
}

export default mergeReducers(
  hatsReducer,
  loadEntriesReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ]),
  updateEntriesReducer([ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ]),
  addEntriesReducer([ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ])
)
