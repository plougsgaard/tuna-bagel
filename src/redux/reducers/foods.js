import _ from 'lodash'
import {
  mergeReducers,
  loadEntriesReducer, addEntriesReducer, updateEntriesReducer, deleteEntriesReducer
} from './util'
import {
  LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE,
  ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE,
  UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE,
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE,

  SHOW_ADD_FORM, HIDE_ADD_FORM,
  RESET_TRANSIENT_STATE
} from '../actions/foods'

const transientState = {
  addFormVisible: false
}

const foodReducer = (state = transientState, action = {}) => {
  const { type, id } = action
  switch (type) {
    case SHOW_ADD_FORM:
      return {
        ...state,
        addFormVisible: true
      }
    case HIDE_ADD_FORM:
      return {
        ...state,
        addFormVisible: false
      }
    case RESET_TRANSIENT_STATE:
      return {
        ...state,
        ...transientState
      }
    default:
      return state
  }
}

export default mergeReducers(
  foodReducer,
  loadEntriesReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ]),
  updateEntriesReducer([ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ]),
  deleteEntriesReducer([ DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE ]),
  addEntriesReducer([ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ])
)
