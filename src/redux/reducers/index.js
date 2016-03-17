import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import resetPassword from './resetPassword'
import userProfile from './userProfile'
import session from './session'
import hats from './hats'
import layout from './layout'

export const rootReducer = combineReducers({
  form,
  resetPassword,
  userProfile,
  session,
  hats,
  layout
})
