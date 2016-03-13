import { combineReducers } from 'redux'
import { LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE } from '../actions/hats'
import { reduceReducers, mergeReducers, loadEntriesReducer } from './util'

const hatsReducer = (state = {
  hat: 'Stetson',
  very: 'clearly',
  aye: 'state'
}, action = {}) => {
  const { type } = action
  switch (type) {
    case 'FOOBAR':
      console.log('wow foobar triggered!')
      return {
        ...state,
        hat: 'very pretty',
        loading: true
      }
    default:
      return state
  }
}

export default mergeReducers(
  hatsReducer,
  loadEntriesReducer([ LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE ])
)
