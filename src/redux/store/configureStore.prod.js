import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiLoad } from '../middleware/apiLoad'
import { apiAdd } from '../middleware/apiAdd'
import { apiUpdate } from '../middleware/apiUpdate'
import { apiDelete } from '../middleware/apiDelete'
import { rootReducer } from '../reducers'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      apiLoad,
      apiAdd,
      apiUpdate,
      apiDelete
    )
  )
}
